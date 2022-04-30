const mongoose = require('mongoose');

const UserSchema = require('../schema/user.schema');

const UserModel = mongoose.model("User", UserSchema);

function createUser(user){
    const newUser = new UserModel(user);
    return newUser.save();
}

function getUserByUserName(userName) {
    return UserModel.findOne({userName: userName}).exec();
}

module.exports = {
    createUser,
    getUserByUserName,
}