const redisClient = require("../config/redisConfig");
const dbPostgre = require("../models/PostgreSql/index");
const { Sequelize, Op } = require("sequelize");
const { BadRequest, NotFound, InternalServer } = require("../utils/appErrors");

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
      const result = await redisClient.reserveStock(
        redisKey,
        item.quantity,
        ttl,
      );

      if (result === -1) {
        outOfStockItems.push(item.attributeId);
        continue;
      }
      if (result === -2)
        throw InternalServer(`Dữ liệu cache lỗi cho mã ${item.attributeId}.`);

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
          transaction: t,
        });
        if (!attr) throw NotFound("Thông tin sản phẩm không tồn tại.");

        const itemPrice = attr.price * item.quantity;
        totalOrderPrice += itemPrice;

        // 2.3. Chuẩn bị dữ liệu cho OrderItem (bao gồm fromStore)
        orderItemsToCreate.push({
          attributeId: item.attributeId,
          quantity: item.quantity,
          fromStore: item.fromStore, // Lưu shop bán mặt hàng này
          status: "PENDING", // Mặc định từ model, nhưng khai báo ở đây cho rõ ràng
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
    for (const item of items) {
      const currentStock = await Stock.findOne({
        where: { attributeID: item.attributeId },
      });
      await redisClient.set(
        `stock:attr:${item.attributeId}`,
        currentStock.quantity,
        "EX",
        ttl,
      );
    }

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

module.exports = {
  createMultiItemOrder,
};
