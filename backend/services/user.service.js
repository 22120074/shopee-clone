const { User, DataUser } = require("../models/User");

const updateEmail = async (userId, newEmail) => {
    try {
        let userData;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            userData = await DataUser.findOneAndUpdate({ googleID: userId, email: newEmail });
        } else {
            userData = await DataUser.findOneAndUpdate({ userId: userId, email: newEmail });
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateEmail
};
