var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel =  mongoose.model("UserModel", userSchema);

userModel.addWebsite = addWebsite;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUserName = findUserByUserName;
userModel.deleteUser = deleteUser;
userModel.removeWebsite = removeWebsite;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function addWebsite(userId, websiteId) {
    userModel
        .findById(userId)
        .then(function (user) {
           user.websites.push(websiteId);
           user.save();
        });
}

function removeWebsite(userId, websiteId) {
    userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}
function findUserById(userId) {
    return userModel
        .findById(userId);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUserName(username) {
    return userModel.findOne({username: username});
}
