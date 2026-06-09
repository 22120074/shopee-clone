const dbPostgre = require("../models/PostgreSql/index");
const Shop = require("../models/Mongoose/Shop");
const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
const { QueryTypes } = require("sequelize");
const { Op } = Sequelize;

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const ImageProduct = dbPostgre.ImageProduct;
const Sold = dbPostgre.Sold;
const Like = dbPostgre.Like;
const Detail = dbPostgre.Detail;
const Rating = dbPostgre.Rating;
const Stock = dbPostgre.Stock;

const Video_Rating = dbPostgre.Video_Rating;
const Image_Rating = dbPostgre.Image_Rating;

const getAllProduct = async (limit) => {
  // 1. Lấy danh sách sản phẩm (1 Query)
  const products = await Product.findAll({
    limit,
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  if (!products.length) return [];

  const productIds = products.map((p) => p.id);

  // 2. Truy vấn gộp Attribute, Image, Sold bằng [Op.in] (3 Query chạy song song)
  const [allAttributes, allImages, allSolds] = await Promise.all([
    Attribute.findAll({
      where: { productId: { [Op.in]: productIds } },
      attributes: ["id", "productId", "price"],
      raw: true,
    }),

    ImageProduct.findAll({
      where: { productId: { [Op.in]: productIds } },
      attributes: ["id", "productId", "imageUrl"],
      raw: true,
    }),

    Sold.findAll({
      where: { productId: { [Op.in]: productIds } },
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
      ],
      group: ["productId"],
      raw: true,
    }),
  ]);

  const soldsMap = allSolds.reduce((acc, item) => {
    acc[item.productId] = parseInt(item.totalSold) || 0;
    return acc;
  }, {});

  const imagesMap = allImages.reduce((acc, item) => {
    if (!acc[item.productId]) {
      acc[item.productId] = { id: item.id, imageUrl: item.imageUrl };
    }
    return acc;
  }, {});

  const attributesMap = allAttributes.reduce((acc, item) => {
    if (!acc[item.productId]) acc[item.productId] = [];
    acc[item.productId].push({ id: item.id, price: item.price });
    return acc;
  }, {});

  return products.map((product) => ({
    ...product,
    attributes: attributesMap[product.id] || [],
    image: imagesMap[product.id] || null,
    soldCount: soldsMap[product.id] || 0,
  }));
};

const getOneProduct = async (productID) => {
  const product = await Product.findOne({
    where: {
      id: productID,
    },
    raw: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  product.fromStoreId = product.fromStore;
  let shopData;
  if (
    typeof product.fromStore === "string" &&
    !mongoose.Types.ObjectId.isValid(product.fromStore)
  ) {
    shopData = await Shop.findOne({ googleID: product.fromStore });
  } else {
    shopData = await Shop.findOne({ userId: product.fromStore });
  }
  product.fromStore = shopData.nameShop;

  const attributes = await Attribute.findAll({
    where: { productId: product.id },
    attributes: ["id", "imageUrl", "nameEach", "price", "size"],
    raw: true,
  });

  const image = await ImageProduct.findAll({
    where: { productId: product.id },
    attributes: ["imageUrl"],
    raw: true,
  });

  const soldCount =
    (await Sold.sum("quantity", {
      where: { productId: product.id },
    })) || 0;

  const detailedProduct = await Detail.findOne({
    where: { productId: product.id },
    raw: true,
  });

  const likes = await Like.count({
    where: { productId: product.id },
    raw: true,
  });

  const ratings = await Rating.findAll({
    where: { productId: product.id },
    attributes: ["rate"],
    raw: true,
  });

  const stockCounts = await Stock.findAll({
    attributes: ["productId", "attributeID", "quantity"],
    where: {
      productId: product.id,
    },
    raw: true,
  });

  return {
    ...product,
    attributes,
    image,
    soldCount,
    detailedProduct,
    likes,
    ratings,
    stockCounts,
  };
};

// Service liên quan đến thích sản phẩm
const isLikedByUser = async (productID, userID) => {
  const like = await Like.findOne({
    where: { productId: productID, userId: userID },
    raw: true,
  });
  return !!like;
};

const addLikeProduct = async (productID, userID) => {
  await Like.create({ productId: productID, userId: userID });
};

const removeLikeProduct = async (productID, userID) => {
  await Like.destroy({
    where: { productId: productID, userId: userID },
  });
};

// Service liên quan đến đánh giá sản phẩm
const getAllProductReviews = async (productID, limit = 6, page = 1) => {
  const offset = (page - 1) * limit;

  const reviews = await Rating.findAndCountAll({
    where: { productId: productID },
    attributes: ["id", "dataUserId", "rate", "comment", "createdAt"],
    limit,
    offset,
    include: [
      {
        model: Image_Rating,
        attributes: ["imageUrl"],
      },
      {
        model: Video_Rating,
        attributes: ["videoUrl", "thumbnailUrl"],
      },
      {
        model: Attribute,
        attributes: ["nameEach", "size"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return {
    reviews,
    totalPages: Math.ceil(reviews.count / limit),
    currentPage: page,
  };
};

const getReviewsByRating = async (productID, limit = 6, page = 1, rating) => {
  const offset = (page - 1) * limit;
  if (page == 0) {
    return {
      rows: [],
      totalPages: 0,
      currentPage: 0,
    };
  }

  const reviews = await Rating.findAndCountAll({
    where: { productId: productID, rate: rating },
    attributes: ["id", "dataUserId", "rate", "comment", "createdAt"],
    limit,
    offset,
    include: [
      {
        model: Image_Rating,
        attributes: ["imageUrl"],
      },
      {
        model: Video_Rating,
        attributes: ["videoUrl", "thumbnailUrl"],
      },
      {
        model: Attribute,
        attributes: ["nameEach", "size"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return {
    rows: reviews.rows,
    totalPages: Math.ceil(reviews.count / limit),
    currentPage: page,
  };
};

const getReviewsWithMedia = async (productID, limit = 6, page = 1) => {
  const reviews = await Rating.findAll({
    where: { productId: productID },
    attributes: ["id", "dataUserId", "rate", "comment", "createdAt"],
    include: [
      { model: Image_Rating, attributes: ["imageUrl"], required: false },
      {
        model: Video_Rating,
        attributes: ["videoUrl", "thumbnailUrl"],
        required: false,
      },
      { model: Attribute, attributes: ["nameEach", "size"], required: false },
    ],
  });

  // Lọc review có ít nhất 1 media
  const filteredReviews = reviews.filter(
    (r) =>
      (r.Image_Ratings && r.Image_Ratings.length > 0) ||
      (r.Video_Ratings && r.Video_Ratings.length > 0),
  );

  // Sắp xếp theo ngày tạo mới nhất
  filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Phân trang thủ công
  const total = filteredReviews.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.min(Math.max(parseInt(page), 1), totalPages || 1);
  const safeOffset = (safePage - 1) * limit;
  const pagedReviews = filteredReviews.slice(safeOffset, safeOffset + limit);

  return {
    rows: pagedReviews,
    totalPages: totalPages,
    currentPage: safePage,
  };
};

const getEachNumofTypeRating = async (productID) => {
  const allCounts = await Rating.findAndCountAll({
    where: { productId: productID },
  });

  const ratingEachCounts = await Rating.findAll({
    where: { productId: productID },
    attributes: [
      "rate",
      [Sequelize.fn("COUNT", Sequelize.col("rate")), "count"],
    ],
    group: ["rate"],
    raw: true,
  });

  const mediaCounts = await Rating.findAll({
    where: { productId: productID },
    attributes: ["id", "dataUserId", "rate", "comment", "createdAt"],
    include: [
      { model: Image_Rating, attributes: ["imageUrl"], required: false },
      {
        model: Video_Rating,
        attributes: ["videoUrl", "thumbnailUrl"],
        required: false,
      },
      { model: Attribute, attributes: ["nameEach", "size"], required: false },
    ],
  });

  // Lọc review có ít nhất 1 media
  const filteredReviews = mediaCounts.filter(
    (r) =>
      (r.Image_Ratings && r.Image_Ratings.length > 0) ||
      (r.Video_Ratings && r.Video_Ratings.length > 0),
  );

  const result = {
    all: allCounts,
    withMedia: filteredReviews.length,
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratingEachCounts.forEach((r) => {
    result[r.rate] = parseInt(r.count);
  });

  return result;
};

const suggestProductNames = async (keyword, limit = 5) => {
  if (!keyword || keyword.trim() === "") return [];

  // Sử dụng Raw Query để tận dụng tối đa unaccent và pg_trgm similarity
  // ILIKE kết hợp unaccent để lọc. similarity để sắp xếp độ chính xác.
  const query = `
    SELECT "name"
    FROM "Products"
    WHERE immutable_unaccent("name") ILIKE immutable_unaccent(:searchKeyword)
       OR similarity(immutable_unaccent("name"), immutable_unaccent(:exactKeyword)) > 0.2
    GROUP BY "name"
    ORDER BY similarity(immutable_unaccent("name"), immutable_unaccent(:exactKeyword)) DESC
    LIMIT :limit;
  `;

  const results = await dbPostgre.sequelize.query(query, {
    replacements: {
      searchKeyword: `%${keyword}%`,
      exactKeyword: keyword,
      limit: limit,
    },
    type: QueryTypes.SELECT,
  });

  // Trả về một mảng chỉ chứa các chuỗi tên sản phẩm (VD: ['Áo thun nam', 'Áo thun nữ'])
  return results.map((item) => item.name);
};

// const searchProductsByName = async (keyword, page = 1, limit = 20) => {
//   if (!keyword || keyword.trim() === "") {
//     return {
//       rows: [],
//       totalPages: 0,
//       currentPage: page,
//     };
//   }

//   const offset = (page - 1) * limit;
//   const searchKeyword = `%${keyword}%`;

//   const countQuery = `
//     SELECT COUNT("id") AS total
//     FROM "Products"
//     WHERE immutable_unaccent("name") ILIKE immutable_unaccent(:searchKeyword)
//   `;

//   const dataQuery = `
//     SELECT "id"
//     FROM "Products"
//     WHERE immutable_unaccent("name") ILIKE immutable_unaccent(:searchKeyword)
//     ORDER BY similarity(immutable_unaccent("name"), immutable_unaccent(:exactKeyword)) DESC
//     LIMIT :limit OFFSET :offset;
//   `;

//   const [countResult, productIdsResult] = await Promise.all([
//     dbPostgre.sequelize.query(countQuery, {
//       replacements: { searchKeyword },
//       type: QueryTypes.SELECT,
//     }),
//     dbPostgre.sequelize.query(dataQuery, {
//       replacements: { searchKeyword, exactKeyword: keyword, limit, offset },
//       type: QueryTypes.SELECT,
//     }),
//   ]);

//   const totalRecords = parseInt(countResult[0]?.total || 0, 10);
//   const totalPages = Math.ceil(totalRecords / limit);

//   if (productIdsResult.length === 0) {
//     return {
//       rows: [],
//       totalPages,
//       currentPage: page,
//     };
//   }

//   const productIds = productIdsResult.map((item) => item.id);

//   const [products, attributes, images, soldCounts] = await Promise.all([
//     Product.findAll({
//       where: { id: productIds },
//       raw: true,
//     }),
//     Attribute.findAll({
//       where: { productId: productIds },
//       attributes: ["id", "productId", "price"],
//       raw: true,
//     }),
//     ImageProduct.findAll({
//       where: { productId: productIds },
//       attributes: ["id", "productId", "imageUrl"],
//       raw: true,
//     }),
//     Sold.findAll({
//       where: { productId: productIds },
//       attributes: [
//         "productId",
//         [Sequelize.fn("sum", Sequelize.col("quantity")), "totalSold"],
//       ],
//       group: ["productId"],
//       raw: true,
//     }),
//   ]);

//   const attributeMap = attributes.reduce((acc, attr) => {
//     if (!acc[attr.productId]) acc[attr.productId] = [];
//     acc[attr.productId].push({ id: attr.id, price: attr.price });
//     return acc;
//   }, {});

//   const imageMap = images.reduce((acc, img) => {
//     if (!acc[img.productId]) {
//       acc[img.productId] = { id: img.id, imageUrl: img.imageUrl };
//     }
//     return acc;
//   }, {});

//   const soldMap = soldCounts.reduce((acc, sold) => {
//     acc[sold.productId] = parseInt(sold.totalSold || 0, 10);
//     return acc;
//   }, {});

//   const productMap = products.reduce((acc, product) => {
//     acc[product.id] = {
//       ...product,
//       attributes: attributeMap[product.id] || [],
//       image: imageMap[product.id] || null,
//       soldCount: soldMap[product.id] || 0,
//     };
//     return acc;
//   }, {});

//   const sortedProducts = productIds.map((id) => productMap[id]);

//   return {
//     rows: sortedProducts,
//     totalPages,
//     currentPage: page,
//   };
// };

const searchProductsByName = async (
  keyword,
  page = 1,
  limit = 20,
  filters = {},
) => {
  const { category, minRating, minPrice, maxPrice } = filters;

  if (
    (!keyword || keyword.trim() === "") &&
    !category &&
    minRating === undefined &&
    minPrice === undefined &&
    maxPrice === undefined
  ) {
    return {
      rows: [],
      totalPages: 0,
      currentPage: page,
    };
  }

  const offset = (page - 1) * limit;
  let whereConditions = [];
  let replacements = { limit, offset };

  if (keyword && keyword.trim() !== "") {
    whereConditions.push(
      `immutable_unaccent("Products"."name") ILIKE immutable_unaccent(:searchKeyword)`,
    );
    replacements.searchKeyword = `%${keyword}%`;
    replacements.exactKeyword = keyword;
  }

  if (category) {
    whereConditions.push(`"Products"."category" = :category`);
    replacements.category = category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    let priceConds = [];
    if (minPrice !== undefined) {
      priceConds.push(`a."price" >= :minPrice`);
      replacements.minPrice = minPrice;
    }
    if (maxPrice !== undefined) {
      priceConds.push(`a."price" <= :maxPrice`);
      replacements.maxPrice = maxPrice;
    }
    whereConditions.push(`EXISTS (
      SELECT 1 FROM "Attributes" a 
      WHERE a."productId" = "Products"."id" AND ${priceConds.join(" AND ")}
    )`);
  }

  if (minRating !== undefined) {
    whereConditions.push(`(
      SELECT COALESCE(AVG(r."rate"), 0) 
      FROM "Ratings" r 
      WHERE r."productId" = "Products"."id"
    ) >= :minRating`);
    replacements.minRating = minRating;
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  const orderClause =
    keyword && keyword.trim() !== ""
      ? `ORDER BY similarity(immutable_unaccent("Products"."name"), immutable_unaccent(:exactKeyword)) DESC`
      : `ORDER BY "Products"."createdAt" DESC`;

  const countQuery = `
    SELECT COUNT("Products"."id") AS total
    FROM "Products"
    ${whereClause}
  `;

  const dataQuery = `
    SELECT "Products"."id"
    FROM "Products"
    ${whereClause}
    ${orderClause}
    LIMIT :limit OFFSET :offset;
  `;

  const [countResult, productIdsResult] = await Promise.all([
    dbPostgre.sequelize.query(countQuery, {
      replacements,
      type: QueryTypes.SELECT,
    }),
    dbPostgre.sequelize.query(dataQuery, {
      replacements,
      type: QueryTypes.SELECT,
    }),
  ]);

  const totalRecords = parseInt(countResult[0]?.total || 0, 10);
  const totalPages = Math.ceil(totalRecords / limit);

  if (productIdsResult.length === 0) {
    return {
      rows: [],
      totalPages,
      currentPage: page,
    };
  }

  const productIds = productIdsResult.map((item) => item.id);

  const [products, attributes, images, soldCounts] = await Promise.all([
    Product.findAll({
      where: { id: productIds },
      raw: true,
    }),
    Attribute.findAll({
      where: { productId: productIds },
      attributes: ["id", "productId", "price"],
      raw: true,
    }),
    ImageProduct.findAll({
      where: { productId: productIds },
      attributes: ["id", "productId", "imageUrl"],
      raw: true,
    }),
    Sold.findAll({
      where: { productId: productIds },
      attributes: [
        "productId",
        [Sequelize.fn("sum", Sequelize.col("quantity")), "totalSold"],
      ],
      group: ["productId"],
      raw: true,
    }),
  ]);

  const attributeMap = attributes.reduce((acc, attr) => {
    if (!acc[attr.productId]) acc[attr.productId] = [];
    acc[attr.productId].push({ id: attr.id, price: attr.price });
    return acc;
  }, {});

  const imageMap = images.reduce((acc, img) => {
    if (!acc[img.productId]) {
      acc[img.productId] = { id: img.id, imageUrl: img.imageUrl };
    }
    return acc;
  }, {});

  const soldMap = soldCounts.reduce((acc, sold) => {
    acc[sold.productId] = parseInt(sold.totalSold || 0, 10);
    return acc;
  }, {});

  const productMap = products.reduce((acc, product) => {
    acc[product.id] = {
      ...product,
      attributes: attributeMap[product.id] || [],
      image: imageMap[product.id] || null,
      soldCount: soldMap[product.id] || 0,
    };
    return acc;
  }, {});

  const sortedProducts = productIds.map((id) => productMap[id]);

  return {
    rows: sortedProducts,
    totalPages,
    currentPage: page,
  };
};

module.exports = {
  getAllProduct,
  getOneProduct,
  addLikeProduct,
  isLikedByUser,
  removeLikeProduct,
  getAllProductReviews,
  getReviewsByRating,
  getReviewsWithMedia,
  getEachNumofTypeRating,
  suggestProductNames,
  searchProductsByName,
};
