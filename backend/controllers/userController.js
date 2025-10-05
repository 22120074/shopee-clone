const { updateEmail } = require("../services/user.service");

exports.updateEmailAPI = async (req, res, next) => {
    try {
        const { userId, newEmail } = req.body;
        let email = newEmail.trim();
        if (!userId || !newEmail) {
            return res.status(400).json({ message: "Thiếu userId hoặc newEmail" });
        }
        const updatedUser = await updateEmail(userId, email);
        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return res.status(200).json({ message: "Cập nhật email thành công" });
    } catch (error) {
        next(error);
    }
};