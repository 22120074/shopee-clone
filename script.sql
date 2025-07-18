CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "Products" (
  id, name, favorite, discount, "attributeName", "fromStore", category, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(),
  'GIÀY CAO GÓT MÃ LTC93 CAO 8P CÓ 2 MÀU ĐEN DA LỘN, KEM DA TRƠN THỜI TRANG 2023',
  false,
  10,
  'Color',
  'Kho tổng',
  'Giày Dép Nữ',
  NOW(),
  NOW()
);

INSERT INTO "ImageProducts" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lx3bzpzyl40@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-leuyk4ce8sjue2@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lwwao0psx52@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lwwao3ixtd5@resize_w900_nl.webp', Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lwwao243xbf@resize_w900_nl.webp', Now(), Now());

INSERT INTO "Attributes" (id, "productId", "nameEach", "imageUrl", "price", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'Đen C93', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lzkk73xcxbc@resize_w48_nl.webp', 100000, Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'Kem C93', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lzlxv38lpad@resize_w48_nl.webp', 200000, Now(), Now()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 'Đỏ C93', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz8lzn9l5eoxfc@resize_w48_nl.webp', 90000, Now(), Now());

INSERT INTO "Sizes" (id, "productId", "size", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 35, NOW(), NOW()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 36, NOW(), NOW()),
(uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 37, NOW(), NOW());

INSERT INTO "Details" (
  id, "productId", "stock", "material", "origin", "shipFrom", description, "createdAt", "updatedAt"
) VALUES (
  uuid_generate_v4(), 'ccaebcc9-187b-4f09-a9b3-b5ee97614ddc', 99828, 'Da cao cấp', 'Việt Nam', 'Hà Nội', 'Đây là sản phẩm mẫu', NOW(), NOW()
);