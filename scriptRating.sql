INSERT INTO "Ratings" (
    id, "dataUserId", "productId", "attributeId", rate, comment, "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '682f6a6dc03db0c4d566bf55',
    '91481205-3905-4d41-b456-1db4aafb6d8b',
    '1b60c470-cef4-4614-b73b-5f199e65e047',
    4,
    'Sản phẩm rất tốt, mình rất thích',
    NOW(),
    NOW()
);

INSERT INTO "Ratings" (
    id, "dataUserId", "productId", "attributeId", rate, comment, "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '6879b7ac16685109bbc057b9',
    '91481205-3905-4d41-b456-1db4aafb6d8b',
    '1b60c470-cef4-4614-b73b-5f199e65e047',
    5,
    'Sản phẩm rất tốt, mình rất thích tuyệt cm nó vời luôn cả nhà ơi!!! Quẹo lựa nên mua nha cả nhà',
    NOW(),
    NOW()
);

INSERT INTO "Video_Ratings" (
    id, "ratingId", "videoUrl", "thumbnailUrl", "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '9eec2f21-17ce-4b2b-9fd1-58a3997afbe8',
    '/videos/video_1.m3u8',
    '/images/video_1.jpg',
    NOW(),
    NOW()
);

INSERT INTO "Video_Ratings" (
    id, "ratingId", "videoUrl", "thumbnailUrl", "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '9eec2f21-17ce-4b2b-9fd1-58a3997afbe8',
    '/videos/Floating.m3u8',
    '/images/Floating.jpg',
    NOW(),
    NOW()
);

INSERT INTO "Image_Ratings" (
    id, "ratingId", "imageUrl", "createdAt", "updatedAt"
) VALUES (
    uuid_generate_v4(),
    '9eec2f21-17ce-4b2b-9fd1-58a3997afbe8',
    '/images/image_1.webp',
    NOW(),
    NOW()
);


