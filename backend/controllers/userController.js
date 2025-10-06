const { updateEmail, updatePhone } = require("../services/user.service");

exports.updateEmailAPI = async (req, res, next) => {
    try {
        const { userId, email } = req.body;
        let newEmail = email.trim();
        // console.log("UserId: ", userId);
        // console.log("Type: ", typeof userId);
        // console.log("New Email: ", newEmail);
        if (!userId || !email) {
            return res.status(400).json({ message: "Thiếu userId hoặc newEmail" });
        }
        const updatedUser = await updateEmail(userId, newEmail);
        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return res.status(200).json({ message: "Cập nhật email thành công" });
    } catch (error) {
        next(error);
    }
};

exports.updatePhoneAPI = async (req, res, next) => {
    try {
        const { userId, phone } = req.body;
        let newPhone = phone.trim();
        if (!userId || !phone) {
            return res.status(400).json({ message: "Thiếu userId hoặc newPhone" });
        }
        const updatedUser = await updatePhone(userId, newPhone);
        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return res.status(200).json({ message: "Cập nhật số điện thoại thành công" });
    } catch (error) {
        next(error);
    }
};