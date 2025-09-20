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

-- -------------------------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "Products" (
  id, name, favorite, discount, "attributeName", "fromStore", category, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(),
  'Bàn phím cơ gaming không dây LANGTU LT104 pro, bàn phím bluetooth 3mode hotswap keycap xuyên led RGB',
  false,
  28,
  'Màu sắc',
  'Langtu Store',
  'Máy Tính & Laptop',
  NOW(),
  NOW()
);

INSERT INTO "ImageProducts" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8fpi1c3@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtjs66ypuqj37@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8eaxl0a@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb8iimx06@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtl0sb7yuop1d@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0boxpk7a@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0b2ps5s7ap96e@resize_w900_nl.webp', Now(), Now());

INSERT INTO "Attributes" (id, "productId", "nameEach", "size", "price", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 'Đen', '', 
2099000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwtqus65132x5c@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 'Black Pink Gra Pro', '', 
2469000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mb3mp90xsrfc8f@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 'Ghi xanh', '', 
1377000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3eoxi0bnik517@resize_w900_nl.webp', 
Now(), Now()),
(uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 'Trắng đen hồng', '', 
1377000,
'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0xxu592o4dre4@resize_w900_nl.webp', 
Now(), Now());


INSERT INTO "Details" (
  id, "productId", "material", "origin", "shipFrom", description, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 'Nhựa', 'Việt Nam', 'Hồ Chí Minh', 'Đây là sản phẩm mẫu', NOW(), NOW()
);

INSERT INTO "Stocks" (
  id, "productId", "attributeID", "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33', 
  (SELECT id FROM "Attributes" WHERE "productId" = 'f487c7a1-8de5-4ec7-9ea5-378e89aa0b33' AND "nameEach" = 'Black Pink Gra Pro' AND size = ''),
  NOW(), NOW()
);

-- -------------------------------------------------------------------------------------------------
INSERT INTO "Products" (
  id, name, favorite, discount, "attributeName", "fromStore", category, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(),
  '(CHUCHAN) Tóp mỡ da giòn rim nước mắm, nhà làm chuẩn vị',
  false,
  5,
  'Đóng gói',
  'CHUCHAN Shop',
  'Bách Hóa Online',
  NOW(),
  NOW()
);

INSERT INTO "ImageProducts" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
'https://down-vn.img.susercontent.com/file/vn-11134258-820l4-men1dm4813ied5', Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll7qtn36a@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll7qtbhf0@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll869kde5@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m01nzll8lq4v33@resize_w900_nl.webp', Now(), Now());

INSERT INTO "Attributes" (id, "productId", "nameEach", "size", "price", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 'Túi 50gr', '', 
25000,
'', 
Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 'Hủ 100gr', '', 
40000,
'', 
Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 'Túi 250gr kèm ớt rim', '', 
1377000,
'', 
Now(), Now()),
(uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 'Túi 250gr kèm sốt tắc', '', 
1377000,
'', 
Now(), Now());


INSERT INTO "Details" (
  id, "productId", "material", "origin", "shipFrom", description, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 'Bánh tráng', 'Việt Nam', 'Hồ Chí Minh', 'Đây là sản phẩm mẫu', NOW(), NOW()
);

INSERT INTO "Stocks" (
  id, "productId", "attributeID", "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00', 
  (SELECT id FROM "Attributes" WHERE "productId" = 'cf2d4ee1-0c03-41f2-bc31-acc235d32b00' AND "nameEach" = 'Túi 50gr' AND size = ''),
  NOW(), NOW()
);