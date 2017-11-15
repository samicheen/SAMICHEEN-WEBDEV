var mongoose = require("mongoose");
var userModel =  require("../user/user.model.server");
var websiteSchema = require("./website.schema.server");
var websiteModel =  mongoose.model("WebsiteModel", websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    var websiteTmp = null;
    website.developer = userId;
    return websiteModel.create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({developer: userId})
        .populate('developer', 'firstName lastName')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function () {
            return userModel.removeWebsite(userId, websiteId)
        });
}