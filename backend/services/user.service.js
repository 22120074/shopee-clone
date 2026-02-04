const { User, DataUser } = require("../models/Mongoose/User");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const updateEmail = async (userId, newEmail) => {
    try {
        let userData;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            userData = await DataUser.findOneAndUpdate(
                { googleID: userId },
                { $set: { email: newEmail } },
                { new: true });
        } else {
            userData = await DataUser.findOneAndUpdate(
                { userId: userId },
                { $set: { email: newEmail } },
                { new: true }
            );
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

const updatePhone = async (userId, newPhone) => {
    try {
        let userData;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            userData = await DataUser.findOneAndUpdate(
                { googleID: userId },
                { $set: { phone: newPhone } },
                { new: true });
        } else {
            userData = await DataUser.findOneAndUpdate(
                { userId: userId },
                { $set: { phone: newPhone } },
                { new: true }
            );
        }
        return userData;
    } catch (error) {
        throw error;
    }
};

const updateProfile = async (userId, displayNameForm, nameForm, genderForm, date) => {
    try {
        let userData;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            userData = await DataUser.findOneAndUpdate(
                { googleID: userId },
                { $set: { displayName: displayNameForm, name: nameForm, gender: genderForm, dateOfBirth: date } },
                { new: true, runValidators: true }
            );
        } else {
            userData = await DataUser.findOneAndUpdate(
                { userId: userId },
                { $set: { displayName: displayNameForm, name: nameForm, gender: genderForm, dateOfBirth: date } },
                { new: true, runValidators: true }
            );
        }
        return userData;
    } catch (error) {
        throw error;
    }
};

const removeOldAvatar = async (userId) => {
    try {
        let user;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
                user = await DataUser.findOne({ googleID: userId });
        } else {
            user = await DataUser.findOne({ userId: userId });
        }
        if (!user) return null;    
        if (user.avatarUrl && !user.avatarUrl.startsWith("http")) {
            const relativePath = user.avatarUrl.replace(/^[/\\]?uploads[/\\]?/, "");
            const oldPath = path.join("D:/Mon_Hoc/Shopee_Database/Uploads", relativePath);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const updateAvatar = async (userId, avatar, isUrl) => {
    try {
        let avatarPath = "";
        if (isUrl === "true" || isUrl === true) {
            avatarPath = avatar; 
        } else {
            const fileName = path.basename(avatar.path);
            avatarPath = `/uploads/${fileName}`;
        }
        let userData;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            userData = await DataUser.findOneAndUpdate(
                { googleID: userId },
                { $set: { avatarUrl: avatarPath } },
                { new: true, runValidators: true }
            );
        } else {
            userData = await DataUser.findOneAndUpdate(
                { userId: userId },
                { $set: { avatarUrl: avatarPath } },
                { new: true, runValidators: true }
            );
        }
        return userData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateEmail,
    updatePhone,
    updateProfile,
    updateAvatar,
    removeOldAvatar
};
