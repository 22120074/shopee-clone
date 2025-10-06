const { User, DataUser } = require("../models/User");
const mongoose = require("mongoose");

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

module.exports = {
    updateEmail,
    updatePhone,
};
