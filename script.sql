CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "Products" (
  id, name, favorite, discount, "attributeName", "fromStore", category, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(),
  'Lót chuột cỡ lớn họa tiết Typography tối giản đa dạng kích thước, pad chuột gaming chống trơn trượt',
  true,
  10,
  'Màu sắc',
  'Kho tổng',
  'Máy Tính & Laptop',
  NOW(),
  NOW()
);

INSERT INTO "ImageProducts" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eow14d1pdo7f@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowfv5gyik27@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowfv5gy0126@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowl11wwxo47@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eowl11wwf576@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', Now(), Now());

INSERT INTO "Attributes" (id, "productId", "nameEach", "size", "price", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Đen - Topography', '60x35cm', 
65000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Đen - Topography', '60x30cm', 
65000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Đen - Topography', '70x30cm', 
65000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Đen - Topography', '70x140cm', 
250000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Trắng - Topography', '40x45cm', 
650000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Trắng - Topography', '90x40cm', 
80000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now());


INSERT INTO "Details" (
  id, "productId", "material", "origin", "shipFrom", description, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 'Vải cao cấp', 'Việt Nam', 'Hà Nội', 'Đây là sản phẩm mẫu', NOW(), NOW()
);

INSERT INTO "Stocks" (
  id, "productId", "attributeID", "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), '91481205-3905-4d41-b456-1db4aafb6d8b', 
  (SELECT id FROM "Attributes" WHERE "productId" = '91481205-3905-4d41-b456-1db4aafb6d8b' AND "nameEach" = 'Đen - Topography' AND size = '80x30cm'),
  100, NOW(), NOW()
);