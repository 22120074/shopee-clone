INSERT INTO "Ratings" (
    id, "productId", "attributeId", rate, comment, "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '91481205-3905-4d41-b456-1db4aafb6d8b',
    '1b60c470-cef4-4614-b73b-5f199e65e047',
    4,
    'Sản phẩm rất tốt, mình rất thích',
    NOW(),
    NOW()
);

INSERT INTO "Ratings" (
    id, "productId", "attributeId", rate, comment, "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '91481205-3905-4d41-b456-1db4aafb6d8b',
    '1b60c470-cef4-4614-b73b-5f199e65e047',
    5,
    'Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà',
    NOW(),
    NOW()
);

INSERT INTO "Video_Ratings" (
    id, "ratingId", "videoUrl", "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '63ec2b40-1dfa-4f84-981c-b4d7a832086d',
    '/videos/video_1.mp4',
    NOW(),
    NOW()
);

INSERT INTO "Image_Ratings" (
    id, "ratingId", "imageUrl", "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '63ec2b40-1dfa-4f84-981c-b4d7a832086d',
    '/images/image_1.webp',
    NOW(),
    NOW()
);


