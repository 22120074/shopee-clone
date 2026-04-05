const { DataUser } = require("../models/Mongoose/User");
const mongoose = require("mongoose");

const updateEmail = async (userId, newEmail) => {
  try {
    let userData;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      userData = await DataUser.findOneAndUpdate(
        { googleID: userId },
        { $set: { email: newEmail } },
        { new: true },
      );
    } else {
      userData = await DataUser.findOneAndUpdate(
        { userId: userId },
        { $set: { email: newEmail } },
        { new: true },
      );
    }
    return userData;
  } catch (error) {
    throw error;
  }
};

const updatePhone = async (userId, newPhone) => {
  try {
    let userData;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      userData = await DataUser.findOneAndUpdate(
        { googleID: userId },
        { $set: { phone: newPhone } },
        { new: true },
      );
    } else {
      userData = await DataUser.findOneAndUpdate(
        { userId: userId },
        { $set: { phone: newPhone } },
        { new: true },
      );
    }
    return userData;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  userId,
  displayNameForm,
  nameForm,
  genderForm,
  date,
) => {
  try {
    let userData;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      userData = await DataUser.findOneAndUpdate(
        { googleID: userId },
        {
          $set: {
            displayName: displayNameForm,
            name: nameForm,
            gender: genderForm,
            dateOfBirth: date,
          },
        },
        { new: true, runValidators: true },
      );
    } else {
      userData = await DataUser.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            displayName: displayNameForm,
            name: nameForm,
            gender: genderForm,
            dateOfBirth: date,
          },
        },
        { new: true, runValidators: true },
      );
    }
    return userData;
  } catch (error) {
    throw error;
  }
};

const getPublicId = async (userId) => {
  try {
    let userData;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      userData = await DataUser.findOne({ googleID: userId }, { publicId: 1 });
    } else {
      userData = await DataUser.findOne({ userId: userId }, { publicId: 1 });
    }
    return userData?.publicId;
  } catch (error) {
    throw error;
  }
};

const updateAvatar = async (userId, file) => {
  try {
    let userData;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      userData = await DataUser.findOneAndUpdate(
        { googleID: userId },
        { $set: { avatarUrl: file.path, publicId: file.filename } },
        { new: true, runValidators: true },
      );
    } else {
      userData = await DataUser.findOneAndUpdate(
        { userId: userId },
        { $set: { avatarUrl: file.path, publicId: file.filename } },
        { new: true, runValidators: true },
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
  getPublicId,
};
