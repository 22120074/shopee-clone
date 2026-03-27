const redisClient = require("../config/redisConfig");
const dbPostgre = require("../models/PostgreSql/index");
const { Sequelize, Op } = require("sequelize");
const { BadRequest, NotFound, InternalServer } = require("../utils/appErrors");
const moment = require("moment");
const crypto = require("crypto");
const qs = require("qs");

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const Stock = dbPostgre.Stock;
const Order = dbPostgre.Order;
const OrderItem = dbPostgre.OrderItem;
const sequelize = dbPostgre.sequelize;

const getStockTTL = () => 7200 + Math.floor(Math.random() * 600);

const createMultiItemOrder = async (userId, items) => {
  const reservedItems = [];
  const outOfStockItems = [];
  const ttl = getStockTTL();

  try {
    // --- BƯỚC 1: REDIS GATEKEEPER (GIỮ CHỖ) ---
    for (const item of items) {
      const redisKey = `stock:attr:${item.attributeId}`;
      let result = await redisClient.reserveStock(redisKey, item.quantity, ttl);

      if (result === -2) {
        const stockData = await Stock.findOne({
          where: { attributeID: item.attributeId },
        });

        if (!stockData)
          throw NotFound(
            `Không tìm thấy sản phẩm ${item.attributeId} trong kho.`,
          );

        await redisClient.set(redisKey, stockData.quantity, "EX", ttl);
        result = await redisClient.reserveStock(redisKey, item.quantity, ttl);
      }

      if (result === -1) {
        outOfStockItems.push(item.attributeId);
        continue;
      }
      if (result === -2)
        throw InternalServer(
          `Lỗi đồng bộ hệ thống cho mã ${item.attributeId}.`,
        );
      reservedItems.push(item);
    }

    if (outOfStockItems.length > 0) {
      throw BadRequest("Một số sản phẩm đã hết hàng.", {
        errorType: "OUT_OF_STOCK",
        failedAttributeIds: outOfStockItems,
      });
    }

    // --- BƯỚC 2: DATABASE TRANSACTION ---
    const finalOrder = await sequelize.transaction(async (t) => {
      let totalOrderPrice = 0;
      const orderItemsToCreate = [];

      for (const item of items) {
        // 2.1. Cập nhật tồn kho thực tế
        const [affectedRows] = await Stock.update(
          { quantity: sequelize.literal(`quantity - ${item.quantity}`) },
          {
            where: {
              attributeID: item.attributeId,
              quantity: { [Op.gte]: item.quantity },
            },
            transaction: t,
          },
        );

        if (affectedRows === 0) {
          throw BadRequest("Hàng vừa hết trong giây lát!", {
            errorType: "OUT_OF_STOCK",
            failedAttributeIds: [item.attributeId],
          });
        }

        // 2.2. Lấy giá từ Attribute để tính tiền
        const attr = await Attribute.findByPk(item.attributeId, {
          include: [
            {
              model: dbPostgre.Product,
              attributes: ["discount"],
            },
          ],
          transaction: t,
        });
        if (!attr) throw NotFound("Thông tin sản phẩm không tồn tại.");

        const discount = attr.Product?.discount || 0;
        const finalUnitPrice = attr.price * (1 - discount / 100);

        const itemPrice = finalUnitPrice * item.quantity;
        totalOrderPrice += itemPrice;

        // 2.3. Chuẩn bị dữ liệu cho OrderItem (bao gồm fromStore)
        orderItemsToCreate.push({
          attributeId: item.attributeId,
          quantity: item.quantity,
          purchasePrice: finalUnitPrice,
          fromStore: item.fromStore,
          status: "PENDING",
        });
      }

      // 2.4. Tạo Order tổng
      const newOrder = await Order.create(
        { userId, totalPrice: totalOrderPrice, status: "PENDING" },
        { transaction: t },
      );

      // 2.5. Bulk Create OrderItems (Gán orderId cho từng item)
      const finalItemsData = orderItemsToCreate.map((oi) => ({
        ...oi,
        orderId: newOrder.id,
      }));
      await OrderItem.bulkCreate(finalItemsData, { transaction: t });

      return newOrder;
    });

    // --- BƯỚC 3: ĐỒNG BỘ REDIS SAU KHI THÀNH CÔNG ---
    const attributeIds = items.map((item) => item.attributeId);
    const currentStocks = await Stock.findAll({
      where: { attributeID: { [Op.in]: attributeIds } },
    });

    await Promise.all(
      currentStocks.map((stock) => {
        return redisClient.set(
          `stock:attr:${stock.attributeID}`,
          stock.quantity,
          "EX",
          ttl,
        );
      }),
    );

    return finalOrder;
  } catch (error) {
    // --- BƯỚC 4: ROLLBACK REDIS NẾU THẤT BẠI ---
    for (const reserved of reservedItems) {
      await redisClient.incrby(
        `stock:attr:${reserved.attributeId}`,
        reserved.quantity,
      );
    }
    throw error;
  }
};

// Hàm hỗ trợ sắp xếp object
const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

const createPaymentUrl = (req) => {
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let tmnCode = process.env.VNP_TMN_CODE;
  let secretKey = process.env.VNP_HASH_SECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURN_URL;

  let orderId = moment(date).format("DDHHmmss"); // Mã đơn hàng tạm thời
  let amount = req.body.amount; // Số tiền từ frontend
  let bankCode = req.body.bankCode || ""; // Ví dụ: 'VNBANK'

  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100; // VNPAY tính theo đơn vị đồng, không phải nghìn đồng
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = req.body.ipAddr || "127.0.0.1";
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  // Sắp xếp các tham số theo alphabet (bắt buộc)
  vnp_Params = sortObject(vnp_Params);

  let signData = qs.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  console.log("=== VNPAY DEBUG ===");
  console.log("1. Raw Params:", vnp_Params);
  console.log("2. Sign Data (Chuỗi trước khi băm):", signData);
  console.log("3. Secret Key đang dùng:", secretKey);
  console.log("4. Mã băm sinh ra:", signed);
  return vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
};

const verifyReturnUrl = (vnp_Params) => {
  let secureHash = vnp_Params["vnp_SecureHash"];

  // Xóa các key liên quan đến chữ ký trước khi hash lại
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  // Sắp xếp lại object (Dùng lại hàm sortObject bạn đã có)
  vnp_Params = sortObject(vnp_Params);

  let secretKey = process.env.VNP_HASH_SECRET;
  let signData = querystring.stringify(vnp_Params, { encode: false });

  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  // So sánh chữ ký VNPAY gửi về và chữ ký ta tự tính toán
  return secureHash === signed;
};

const getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);
    return order;
  } catch (error) {
    throw error;
  }
};

// 2. Hàm cập nhật trạng thái đơn hàng
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const updatedOrder = await Order.update(
      { status: newStatus },
      { where: { id: orderId } },
    );
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMultiItemOrder,
  createPaymentUrl,
  verifyReturnUrl,
  getOrderById,
  updateOrderStatus,
};
