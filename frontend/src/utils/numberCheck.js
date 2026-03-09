export const isValidPhone = (phone) => {
    const cleaned = phone.trim();
    // Kiểm tra độ dài (10 hoặc 11 số) và chỉ toàn số
    return /^[0-9]{10,11}$/.test(cleaned);
};
