# Database Index Context — Shopee Clone (All Modules)

> **Generated:** 2026-06-10 | **ORM:** Sequelize (PostgreSQL) + Mongoose (MongoDB)
> **Scope:** Product, Order, Rating, Notification, Shop/Follow, User, Cart

---

# 1. Database Schema

## 1.1 PostgreSQL Tables (Sequelize)

### `Products`

| Column          | Data Type | Constraints        |
| --------------- | --------- | ------------------ |
| `id`            | UUID      | PK, default UUIDV4 |
| `name`          | STRING    | —                  |
| `favorite`      | BOOLEAN   | —                  |
| `discount`      | FLOAT     | —                  |
| `attributeName` | STRING    | —                  |
| `fromStore`     | STRING    | NOT NULL           |
| `category`      | STRING    | —                  |
| `createdAt`     | DATE      | Auto (Sequelize)   |
| `updatedAt`     | DATE      | Auto (Sequelize)   |

- **PK:** `id`
- **Existing Indexes:** PK only. No explicit secondary indexes defined.

---

### `Attributes`

| Column      | Data Type | Constraints                |
| ----------- | --------- | -------------------------- |
| `id`        | UUID      | PK, default UUIDV4         |
| `productId` | UUID      | FK → Products.id, NOT NULL |
| `nameEach`  | STRING    | —                          |
| `size`      | STRING    | —                          |
| `price`     | FLOAT     | —                          |
| `imageUrl`  | STRING    | —                          |
| `publicId`  | STRING    | —                          |
| `createdAt` | DATE      | Auto                       |
| `updatedAt` | DATE      | Auto                       |

- **PK:** `id`
- **FK:** `productId` → `Products.id`
- **Existing Indexes:** PK only. Sequelize auto-creates FK index on `productId`.

---

### `Stocks`

| Column        | Data Type | Constraints                                        |
| ------------- | --------- | -------------------------------------------------- |
| `id`          | UUID      | PK, default UUIDV4                                 |
| `productId`   | UUID      | NOT NULL, UNIQUE composite `product_attribute_idx` |
| `attributeID` | UUID      | UNIQUE composite `product_attribute_idx`           |
| `quantity`    | INTEGER   | NOT NULL, default 0, min 0                         |
| `createdAt`   | DATE      | Auto                                               |
| `updatedAt`   | DATE      | Auto                                               |

- **PK:** `id`
- **FK:** `productId` → `Products.id`, `attributeID` → `Attributes.id`
- **Existing Indexes:** Composite UNIQUE on (`productId`, `attributeID`).

---

### `Solds`

| Column      | Data Type | Constraints         |
| ----------- | --------- | ------------------- |
| `id`        | UUID      | PK, default UUIDV4  |
| `productId` | UUID      | FK, NOT NULL        |
| `userId`    | STRING    | NOT NULL            |
| `quantity`  | INTEGER   | NOT NULL, default 1 |
| `createdAt` | DATE      | default NOW         |

- **PK:** `id`
- **FK:** `productId` → `Products.id`
- **Existing Indexes:** PK only.

---

### `ImageProducts`

| Column      | Data Type | Constraints        |
| ----------- | --------- | ------------------ |
| `id`        | UUID      | PK, default UUIDV4 |
| `productId` | UUID      | FK, NOT NULL       |
| `imageUrl`  | STRING    | —                  |
| `publicId`  | STRING    | —                  |

- **PK:** `id`
- **FK:** `productId` → `Products.id`
- **Existing Indexes:** PK only.

---

### `Details`

| Column        | Data Type | Constraints        |
| ------------- | --------- | ------------------ |
| `id`          | UUID      | PK, default UUIDV4 |
| `productId`   | UUID      | FK, NOT NULL       |
| `material`    | STRING    | —                  |
| `origin`      | STRING    | —                  |
| `shipFrom`    | STRING    | —                  |
| `description` | TEXT      | —                  |

- **PK:** `id`
- **FK:** `productId` → `Products.id` (hasOne)
- **Existing Indexes:** PK only.

---

### `Likes`

| Column      | Data Type | Constraints        |
| ----------- | --------- | ------------------ |
| `id`        | UUID      | PK, default UUIDV4 |
| `productId` | UUID      | FK, NOT NULL       |
| `userId`    | STRING    | NOT NULL           |

- **PK:** `id`
- **FK:** `productId` → `Products.id`
- **Existing Indexes:** PK only.

---

### `Ratings`

| Column        | Data Type | Constraints        |
| ------------- | --------- | ------------------ |
| `id`          | UUID      | PK, default UUIDV4 |
| `dataUserId`  | STRING    | NOT NULL           |
| `productId`   | UUID      | FK, NOT NULL       |
| `attributeId` | UUID      | FK, NOT NULL       |
| `rate`        | INTEGER   | NOT NULL           |
| `comment`     | TEXT      | —                  |
| `createdAt`   | DATE      | Auto               |
| `updatedAt`   | DATE      | Auto               |

- **PK:** `id`
- **FK:** `productId` → `Products.id`, `attributeId` → `Attributes.id`
- **Existing Indexes:** PK only.

---

### `Image_Ratings`

| Column     | Data Type | Constraints        |
| ---------- | --------- | ------------------ |
| `id`       | UUID      | PK, default UUIDV4 |
| `ratingId` | UUID      | FK, NOT NULL       |
| `imageUrl` | STRING    | —                  |

- **PK:** `id`
- **FK:** `ratingId` → `Ratings.id`

---

### `Video_Ratings`

| Column         | Data Type | Constraints        |
| -------------- | --------- | ------------------ |
| `id`           | UUID      | PK, default UUIDV4 |
| `ratingId`     | UUID      | FK, NOT NULL       |
| `videoUrl`     | STRING    | —                  |
| `thumbnailUrl` | STRING    | —                  |

- **PK:** `id`
- **FK:** `ratingId` → `Ratings.id`

---

### `Orders`

| Column       | Data Type | Constraints        |
| ------------ | --------- | ------------------ |
| `id`         | UUID      | PK, default UUIDV4 |
| `userId`     | STRING    | NOT NULL           |
| `totalPrice` | FLOAT     | NOT NULL           |
| `status`     | STRING    | NOT NULL           |
| `createdAt`  | DATE      | Auto               |
| `updatedAt`  | DATE      | Auto               |

- **PK:** `id`
- **Existing Indexes:** PK only.

---

### `OrderItems`

| Column          | Data Type | Constraints                  |
| --------------- | --------- | ---------------------------- |
| `id`            | UUID      | PK, default UUIDV4           |
| `orderId`       | UUID      | FK → Orders.id, NOT NULL     |
| `attributeId`   | UUID      | FK → Attributes.id, NOT NULL |
| `fromStore`     | STRING    | NOT NULL                     |
| `quantity`      | INTEGER   | NOT NULL                     |
| `purchasePrice` | FLOAT     | NOT NULL                     |
| `status`        | STRING    | NOT NULL, default "PENDING"  |
| `createdAt`     | DATE      | Auto                         |
| `updatedAt`     | DATE      | Auto                         |

- **PK:** `id`
- **FK:** `orderId` → `Orders.id`, `attributeId` → `Attributes.id`
- **Existing Indexes:** PK only.

---

### `Notifications`

| Column      | Data Type | Constraints               |
| ----------- | --------- | ------------------------- |
| `id`        | UUID      | PK, default UUIDV4        |
| `userId`    | STRING    | NOT NULL                  |
| `senderId`  | STRING    | —                         |
| `content`   | STRING    | NOT NULL                  |
| `type`      | STRING    | NOT NULL, default "OTHER" |
| `isRead`    | BOOLEAN   | NOT NULL, default false   |
| `createdAt` | DATE      | Auto                      |
| `updatedAt` | DATE      | Auto                      |

- **PK:** `id`
- **Existing Indexes:** PK only.

---

### `Follows`

| Column      | Data Type | Constraints        |
| ----------- | --------- | ------------------ |
| `id`        | UUID      | PK, default UUIDV4 |
| `follower`  | STRING    | NOT NULL           |
| `following` | STRING    | NOT NULL           |

- **PK:** `id`
- **Existing Indexes:** PK only.

---

## 1.2 MongoDB Collections (Mongoose)

### `users`

| Field       | Type     | Constraints            |
| ----------- | -------- | ---------------------- |
| `_id`       | ObjectId | PK (auto)              |
| `phone`     | String   | required, unique, trim |
| `password`  | String   | required               |
| `createdAt` | Date     | default Date.now       |

- **Existing Indexes:** `_id` (PK), `phone` (unique).

### `dataUser`

| Field                                   | Type     | Constraints      |
| --------------------------------------- | -------- | ---------------- |
| `_id`                                   | ObjectId | PK (auto)        |
| `userId`                                | ObjectId | ref → User       |
| `googleID`                              | String   | unique           |
| `phone`, `email`, `name`, `displayName` | String   | trim             |
| `gender`                                | String   | enum             |
| `dateOfBirth`                           | Date     | —                |
| `avatarUrl`, `publicId`                 | String   | —                |
| `createdAt`                             | Date     | default Date.now |

- **Existing Indexes:** `_id` (PK), `googleID` (unique).

### `shops`

| Field       | Type     | Constraints      |
| ----------- | -------- | ---------------- |
| `_id`       | ObjectId | PK               |
| `userId`    | ObjectId | ref → User       |
| `googleID`  | String   | unique           |
| `nameShop`  | String   | required         |
| `address`   | [String] | required         |
| `createdAt` | Date     | default Date.now |

- **Existing Indexes:** `_id`, `googleID` (unique).

### `carts`

| Field           | Type     | Constraints |
| --------------- | -------- | ----------- |
| `_id`           | ObjectId | PK          |
| `userId`        | ObjectId | ref → User  |
| `googleId`      | String   | —           |
| `items`         | Array    | —           |
| `totalQuantity` | Number   | required    |
| `totalPrice`    | Number   | required    |

- **Existing Indexes:** `_id` only.

---

# 2. Service Access Patterns

| Service / Controller                              | Tables Accessed (PostgreSQL)                                                                              | Collections (MongoDB) | R/W Pattern                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------- |
| `product.service` → `productController`           | Products, Attributes, ImageProducts, Solds, Likes, Details, Ratings, Stocks, Image_Ratings, Video_Ratings | shops                 | **Read-heavy**                                  |
| `productShop.service` → `shopProductController`   | Products, Attributes, ImageProducts, Solds, Stocks, Details, Follows                                      | shops                 | **Mixed** (Read + Write on create)              |
| `order.service` → `orderController`               | Orders, OrderItems, Stocks, Attributes, Products, ImageProducts                                           | shops                 | **Mixed** (Write-heavy on create, Read on list) |
| `notification.service` → `notificationController` | Notifications                                                                                             | —                     | **Mixed**                                       |
| `shop.service` → `shopController`                 | Products, Follows                                                                                         | shops                 | **Read-heavy**                                  |
| `cart.service` → `cartController`                 | —                                                                                                         | carts                 | **Mixed**                                       |
| `user.service` → `userController`                 | —                                                                                                         | dataUser              | **Write-heavy** (updates)                       |
| `authController`                                  | —                                                                                                         | users, dataUser       | **Mixed**                                       |

---

# 3. Query Breakdown

## 3.1 Product Service (`services/product.service.js`)

### Q1: `getAllProduct` (line 20–57)

```js
Product.findAll({ limit, order: [["createdAt", "DESC"]], raw: true });
```

- **JOINs:** None
- **WHERE:** None
- **ORDER BY:** `Products.createdAt DESC`
- **LIMIT:** Yes (param `limit`, default 48)
- **Pagination:** LIMIT only, no OFFSET

Then for **each** product (N+1):

```js
Attribute.findAll({
  where: { productId: product.id },
  attributes: ["id", "price"],
});
ImageProduct.findOne({
  where: { productId: product.id },
  attributes: ["id", "imageUrl"],
});
Sold.sum("quantity", { where: { productId: product.id } });
```

- **WHERE:** `productId = ?` (operator `=`)

---

### Q2: `getOneProduct` (line 60–135)

```js
Product.findOne({ where: { id: productID } });
```

- **WHERE:** `id = ?` (PK lookup)

Then:

```js
Attribute.findAll({ where: { productId: product.id } });
ImageProduct.findAll({ where: { productId: product.id } });
Sold.sum("quantity", { where: { productId: product.id } });
Detail.findOne({ where: { productId: product.id } });
Like.count({ where: { productId: product.id } });
Rating.findAll({ where: { productId: product.id }, attributes: ["rate"] });
Stock.findAll({ where: { productId: product.id } });
```

- **WHERE:** `productId = ?` on all sub-tables (operator `=`)

MongoDB:

```js
Shop.findOne({ googleID: product.fromStore }); // OR
Shop.findOne({ userId: product.fromStore });
```

---

### Q3: `isLikedByUser` (line 138–144)

```js
Like.findOne({ where: { productId: productID, userId: userID } });
```

- **WHERE:** `productId = ? AND userId = ?` (both `=`)

---

### Q4: `removeLikeProduct` (line 150–154)

```js
Like.destroy({ where: { productId: productID, userId: userID } });
```

- **WHERE:** `productId = ? AND userId = ?` (both `=`)

---

### Q5: `getAllProductReviews` (line 157–187)

```js
Rating.findAndCountAll({
  where: { productId: productID },
  include: [Image_Rating, Video_Rating, Attribute],
  order: [["createdAt", "DESC"]],
  limit,
  offset,
});
```

- **WHERE:** `Ratings.productId = ?` (operator `=`)
- **JOINs:** `Ratings` LEFT JOIN `Image_Ratings` ON `ratingId`, LEFT JOIN `Video_Ratings` ON `ratingId`, LEFT JOIN `Attributes` ON `attributeId`
- **ORDER BY:** `Ratings.createdAt DESC`
- **Pagination:** LIMIT + OFFSET

---

### Q6: `getReviewsByRating` (line 189–226)

```js
Rating.findAndCountAll({
  where: { productId: productID, rate: rating },
  include: [Image_Rating, Video_Rating, Attribute],
  order: [["createdAt", "DESC"]],
  limit,
  offset,
});
```

- **WHERE:** `Ratings.productId = ? AND Ratings.rate = ?` (both `=`)
- **JOINs:** Same as Q5
- **ORDER BY:** `Ratings.createdAt DESC`
- **Pagination:** LIMIT + OFFSET

---

### Q7: `getReviewsWithMedia` (line 228–265)

```js
Rating.findAll({
  where: { productId: productID },
  include: [
    { model: Image_Rating, required: false },
    { model: Video_Rating, required: false },
    { model: Attribute, required: false },
  ],
});
```

- **WHERE:** `Ratings.productId = ?`
- **JOINs:** Same LEFT JOINs as Q5
- **Sorting:** In-memory sort by `createdAt DESC` after fetch
- **Pagination:** In-memory slice

---

### Q8: `getEachNumofTypeRating` (line 267–318)

```js
Rating.findAndCountAll({ where: { productId: productID } });

Rating.findAll({
  where: { productId: productID },
  attributes: ["rate", [fn("COUNT", col("rate")), "count"]],
  group: ["rate"],
});
```

- **WHERE:** `Ratings.productId = ?`
- **GROUP BY:** `rate`

Plus same media join query as Q7.

---

### Q9: `suggestProductNames` (line 320–346) — **Raw SQL**

```sql
SELECT "name"
FROM "Products"
WHERE immutable_unaccent("name") ILIKE immutable_unaccent(:searchKeyword)
   OR similarity(immutable_unaccent("name"), immutable_unaccent(:exactKeyword)) > 0.2
GROUP BY "name"
ORDER BY similarity(immutable_unaccent("name"), immutable_unaccent(:exactKeyword)) DESC
LIMIT :limit;
```

- **WHERE:** `immutable_unaccent(name) ILIKE '%keyword%'` OR `similarity(...) > 0.2`
- **GROUP BY:** `name`
- **ORDER BY:** `similarity(...)` DESC
- **LIMIT:** Yes

---

### Q10: `searchProductsByName` (line 461–632) — **Raw SQL (Dynamic)**

**Count query:**

```sql
SELECT COUNT("Products"."id") AS total FROM "Products" WHERE <dynamic conditions>;
```

**Data query:**

```sql
SELECT "Products"."id" FROM "Products" WHERE <dynamic conditions>
ORDER BY similarity(...) DESC | "Products"."createdAt" DESC
LIMIT :limit OFFSET :offset;
```

**Dynamic WHERE conditions:**

1. `immutable_unaccent("Products"."name") ILIKE immutable_unaccent(:searchKeyword)` — keyword search
2. `"Products"."category" = :category` — category filter (operator `=`)
3. `EXISTS (SELECT 1 FROM "Attributes" a WHERE a."productId" = "Products"."id" AND a."price" >= :minPrice AND a."price" <= :maxPrice)` — price range via subquery
4. `(SELECT COALESCE(AVG(r."rate"), 0) FROM "Ratings" r WHERE r."productId" = "Products"."id") >= :minRating` — avg rating filter via subquery

**ORDER BY:** `similarity(...)` DESC (keyword) or `Products.createdAt DESC` (no keyword)
**Pagination:** LIMIT + OFFSET

Then for the returned product IDs:

```js
Product.findAll({ where: { id: productIds } }); // WHERE id IN (...)
Attribute.findAll({ where: { productId: productIds } }); // WHERE productId IN (...)
ImageProduct.findAll({ where: { productId: productIds } }); // WHERE productId IN (...)
Sold.findAll({
  where: { productId: productIds },
  attributes: ["productId", [fn("sum", col("quantity")), "totalSold"]],
  group: ["productId"],
}); // WHERE productId IN (...) GROUP BY productId
```

---

## 3.2 ProductShop Service (`services/productShop.service.js`)

### Q11: `getAllProductShop` (line 19–61)

```js
Product.findAll({
  where: { fromStore: userId },
  order: [["createdAt", "DESC"]],
});
```

- **WHERE:** `fromStore = ?` (operator `=`)
- **ORDER BY:** `createdAt DESC`

Then per product (N+1):

```js
Attribute.findAll({ where: { productId: product.id } });
ImageProduct.findOne({ where: { productId: product.id } });
Sold.count({ where: { productId: product.id } });
Stock.count({ where: { productId: product.id } });
```

- **WHERE:** `productId = ?`

---

### Q12: `createProductStock` (line 100–125)

```js
Stock.findOrCreate({
  where: { productId, attributeID },
  defaults: { quantity },
});
```

- **WHERE:** `productId = ? AND attributeID = ?` (both `=`)

---

### Q13: `notifyFollowersNewProduct` (line 169–213)

```js
Follow.findAll({ where: { following: shopId }, attributes: ["follower"] });
```

- **WHERE:** `following = ?` (operator `=`)

---

## 3.3 Order Service (`services/order.service.js`)

### Q14: `createMultiItemOrder` — Stock lookup (line 33–35)

```js
Stock.findOne({ where: { attributeID: item.attributeId } });
```

- **WHERE:** `attributeID = ?`

### Q15: `createMultiItemOrder` — Stock update (line 71–80)

```js
Stock.update(
  { quantity: literal(`quantity - ${item.quantity}`) },
  {
    where: {
      attributeID: item.attributeId,
      quantity: { [Op.gte]: item.quantity },
    },
  },
);
```

- **WHERE:** `attributeID = ? AND quantity >= ?` (operators `=`, `>=`)

### Q16: `createMultiItemOrder` — Attribute + Product join (line 90–98)

```js
Attribute.findByPk(item.attributeId, {
  include: [{ model: Product, attributes: ["discount"] }],
});
```

- **WHERE:** `Attributes.id = ?` (PK)
- **JOIN:** `Attributes` JOIN `Products` ON `productId`

### Q17: `createMultiItemOrder` — Stock sync (line 135–137)

```js
Stock.findAll({ where: { attributeID: { [Op.in]: attributeIds } } });
```

- **WHERE:** `attributeID IN (...)` (operator `IN`)

### Q18: `getOrderById` (line 255–262)

```js
Order.findByPk(orderId);
```

- **WHERE:** `id = ?` (PK)

### Q19: `updateOrderStatus` (line 264–274)

```js
Order.update({ status: newStatus }, { where: { id: orderId } });
```

- **WHERE:** `id = ?` (PK)

### Q20: `getListOrderItemsWithDetails` (line 281–477) — **COMPLEX**

```js
OrderItem.findAll({
  where: {
    [Op.or]: [
      { createdAt: { [Op.lt]: cursorDate } },
      { createdAt: cursorDate, id: { [Op.lt]: cursorId } }
    ]
  },
  limit: 6,
  order: [["createdAt", "DESC"], ["id", "DESC"]],
  include: [
    { model: Order, where: { userId, status? }, attributes: ["status", "createdAt"] },
    { model: Attribute, include: [
        { model: Product, attributes: [...], include: [{ model: ImageProduct }] }
      ]
    }
  ]
});
```

- **WHERE (OrderItems):** `createdAt < ? OR (createdAt = ? AND id < ?)` — cursor pagination
- **WHERE (Orders):** `userId = ?` AND optionally `status = ?`
- **JOINs:**
  - `OrderItems` INNER JOIN `Orders` ON `orderId` = `Orders.id`
  - `OrderItems` LEFT JOIN `Attributes` ON `attributeId` = `Attributes.id`
  - `Attributes` LEFT JOIN `Products` ON `productId` = `Products.id`
  - `Products` LEFT JOIN `ImageProducts` ON `productId` = `ImageProducts.productId`
- **ORDER BY:** `OrderItems.createdAt DESC, OrderItems.id DESC`
- **Pagination:** Cursor-based (LIMIT 6)

---

## 3.4 Notification Service (`services/notification.service.js`)

### Q21: `getNotifications` (line 24–57)

```js
Notification.findAll({
  where: { userId, createdAt?: { [Op.lt]: cursor } },
  limit: limit + 1,
  order: [["createdAt", "DESC"]]
});
```

- **WHERE:** `userId = ?` AND optionally `createdAt < ?` (operators `=`, `<`)
- **ORDER BY:** `createdAt DESC`
- **Pagination:** Cursor-based (LIMIT)

### Q22: `markAsRead` (line 59–64)

```js
Notification.update({ isRead: true }, { where: { id: notificationId } });
```

- **WHERE:** `id = ?` (PK)

### Q23: `markAllAsRead` (line 66–68)

```js
Notification.update({ isRead: true }, { where: { userId } });
```

- **WHERE:** `userId = ?`

### Q24: `deleteNotification` (line 70–72)

```js
Notification.destroy({ where: { id: notificationId } });
```

- **WHERE:** `id = ?` (PK)

### Q25: `getUnreadCount` (line 74–76)

```js
Notification.count({ where: { userId, isRead: false } });
```

- **WHERE:** `userId = ? AND isRead = false` (operators `=`, `=`)

---

## 3.5 Shop Service (`services/shop.service.js`)

### Q26: `getShop` — Product count (line 64)

```js
Product.count({ where: { fromStore: userId } });
```

- **WHERE:** `fromStore = ?`

### Q27: `getShop` — Follower count (line 65)

```js
Follow.count({ where: { following: userId } });
```

- **WHERE:** `following = ?`

### Q28: `getShop` — Following count (line 66)

```js
Follow.count({ where: { follower: userId } });
```

- **WHERE:** `follower = ?`

### Q29: `isFollowShop` (line 82–91)

```js
Follow.findOne({ where: { follower: followerId, following: followingId } });
```

- **WHERE:** `follower = ? AND following = ?` (both `=`)

### Q30: `unfollowShop` (line 101–109)

```js
Follow.destroy({ where: { follower: followerId, following: followingId } });
```

- **WHERE:** `follower = ? AND following = ?`

---

## 3.6 Summary: Column Usage Frequency for Index Design

### HIGH-PRIORITY columns (used in WHERE across multiple queries):

| Table             | Column(s)                | Used In             | Operators                              |
| ----------------- | ------------------------ | ------------------- | -------------------------------------- |
| **Products**      | `fromStore`              | Q10, Q11, Q26       | `=`                                    |
| **Products**      | `category`               | Q10                 | `=`                                    |
| **Products**      | `createdAt`              | Q1, Q10, Q11        | ORDER BY DESC                          |
| **Products**      | `name`                   | Q9, Q10             | `ILIKE`, `similarity()`                |
| **Attributes**    | `productId`              | Q1–Q2, Q10–Q11      | `=`, `IN`                              |
| **Attributes**    | `price`                  | Q10                 | `>=`, `<=`                             |
| **ImageProducts** | `productId`              | Q1–Q2, Q10–Q11, Q20 | `=`, `IN`                              |
| **Solds**         | `productId`              | Q1–Q2, Q10–Q11      | `=`, `IN`                              |
| **Ratings**       | `productId`              | Q5–Q8, Q10          | `=`                                    |
| **Ratings**       | `rate`                   | Q6, Q8              | `=`, GROUP BY                          |
| **Ratings**       | `createdAt`              | Q5–Q7               | ORDER BY DESC                          |
| **Likes**         | `productId` + `userId`   | Q3, Q4              | `=` AND `=`                            |
| **Details**       | `productId`              | Q2                  | `=`                                    |
| **Stocks**        | `attributeID`            | Q14–Q17             | `=`, `IN`                              |
| **Stocks**        | `productId`              | Q2, Q11–Q12         | `=`                                    |
| **Orders**        | `userId`                 | Q20                 | `=`                                    |
| **Orders**        | `status`                 | Q20                 | `=`                                    |
| **OrderItems**    | `orderId`                | Q20                 | `=` (FK JOIN)                          |
| **OrderItems**    | `attributeId`            | Q20                 | `=` (FK JOIN)                          |
| **OrderItems**    | `createdAt` + `id`       | Q20                 | `<`, `=` + `<` (cursor), ORDER BY DESC |
| **Notifications** | `userId`                 | Q21, Q23, Q25       | `=`                                    |
| **Notifications** | `createdAt`              | Q21                 | `<`, ORDER BY DESC                     |
| **Notifications** | `isRead`                 | Q25                 | `=`                                    |
| **Follows**       | `following`              | Q13, Q27            | `=`                                    |
| **Follows**       | `follower`               | Q28, Q29, Q30       | `=`                                    |
| **Follows**       | `follower` + `following` | Q29, Q30            | `=` AND `=`                            |

---

-- Kích hoạt extension hỗ trợ trigram và unaccent (nếu chưa có)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Index cho tính năng tìm kiếm tên sản phẩm (Q9, Q10)
CREATE INDEX CONCURRENTLY idx_products_name_trgm
ON "Products" USING GIN (immutable_unaccent("name") gin_trgm_ops);

-- Các bảng con của Product
CREATE INDEX CONCURRENTLY idx_attributes_productid ON "Attributes"("productId");
CREATE INDEX CONCURRENTLY idx_imageproducts_productid ON "ImageProducts"("productId");
CREATE INDEX CONCURRENTLY idx_solds_productid ON "Solds"("productId");
CREATE INDEX CONCURRENTLY idx_details_productid ON "Details"("productId");

-- Phục vụ truy vấn Q14, Q15, Q17 trên bảng Stocks
CREATE INDEX CONCURRENTLY idx_stocks_attributeid ON "Stocks"("attributeID");

-- Các bảng con của Order (phục vụ Q20)
CREATE INDEX CONCURRENTLY idx_orderitems_orderid ON "OrderItems"("orderId");
CREATE INDEX CONCURRENTLY idx_orderitems_attributeid ON "OrderItems"("attributeId");

-- Bảng Products
-- Phục vụ Q11: Lấy sản phẩm của shop và sắp xếp mới nhất
CREATE INDEX CONCURRENTLY idx_products_fromstore_createdat
ON "Products"("fromStore", "createdAt" DESC);

-- Phục vụ Q10: Lọc theo danh mục
CREATE INDEX CONCURRENTLY idx_products_category ON "Products"("category");

-- Bảng Ratings
-- Phục vụ Q5, Q6, Q7, Q8: Lọc đánh giá theo productId, theo rate và sắp xếp mới nhất
CREATE INDEX CONCURRENTLY idx_ratings_product_rate_created
ON "Ratings"("productId", "rate", "createdAt" DESC);

-- Bảng Likes
-- Phục vụ Q3, Q4: Kiểm tra và xóa lượt thích của user
CREATE INDEX CONCURRENTLY idx_likes_product_user
ON "Likes"("productId", "userId");

-- Bảng OrderItems
-- Phục vụ Q20: Cursor Pagination (Lọc theo thời gian và ID giảm dần)
CREATE INDEX CONCURRENTLY idx_orderitems_cursor
ON "OrderItems"("createdAt" DESC, "id" DESC);

-- Bảng Orders
-- Phục vụ Q20: Lọc đơn hàng theo user và trạng thái
CREATE INDEX CONCURRENTLY idx_orders_userid_status
ON "Orders"("userId", "status");

-- Bảng Follows
-- Phục vụ Q28, Q29, Q30: Tìm người theo dõi và hủy theo dõi
CREATE INDEX CONCURRENTLY idx_follows_follower_following
ON "Follows"("follower", "following");
-- Phục vụ Q13, Q27: Đếm số follower của một shop
CREATE INDEX CONCURRENTLY idx_follows_following
ON "Follows"("following");

-- Phục vụ Q21: Tải danh sách thông báo theo thứ tự mới nhất
CREATE INDEX CONCURRENTLY idx_notifications_userid_created
ON "Notifications"("userId", "createdAt" DESC);

-- Phục vụ Q25: Tối ưu triệt để việc đếm thông báo chưa đọc
CREATE INDEX CONCURRENTLY idx_notifications_unread
ON "Notifications"("userId") WHERE "isRead" = false;
