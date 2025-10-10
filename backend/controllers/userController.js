const { updateEmail, updatePhone, updateProfile, updateAvatar, removeOldAvatar } = require("../services/user.service");

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

exports.updateProfileAPI = async (req, res, next) => {
    try {
        const { userId, displayName, name, gender, date } = req.body;
        let newDisplayName = displayName.trim();
        let newName = name.trim();
        let newGender = gender.trim();
        // console.log("UserId: ", userId);
        // console.log("Type: ", typeof userId);
        // console.log("New Display Name: ", newDisplayName);
        // console.log("New Name: ", newName);
        // console.log("New Gender: ", newGender);
        // console.log("Date of Birth: ", date);
        if (!userId || !displayName || !name || !gender || !date) {
            return res.status(400).json({ message: "Thiếu thông tin cập nhật hồ sơ" });
        }
        const updatedUser = await updateProfile(userId, newDisplayName, newName, newGender, date);
        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return res.status(200).json({ message: "Cập nhật hồ sơ thành công" });
    } catch (error) {
        next(error);
    }
};

exports.updateAvatarAPI = async (req, res, next) => {
    try {
        const { userId, isUrl } = req.body;
        const file = req.file;
        const avatar = isUrl === "true" || isUrl === true ? req.body.avatar : file;
        if (!userId || !avatar || isUrl === undefined) {
            return res.status(400).json({ message: "Thiếu thông tin cập nhật avatar" });
        }
        await removeOldAvatar(userId);
        const updatedUser = await updateAvatar(userId, avatar, isUrl);
        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return res.status(200).json({ avatarUrl: updatedUser.avatarUrl, message: "Cập nhật avatar thành công" });
    } catch (error) {
        next(error);
    }
};
