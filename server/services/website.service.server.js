var app = require("../../express");
var websiteModel =  require("../models/website/website.model.server");
var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

function deleteWebsite(request, response) {
    var userId = request.params.userId;
    var websiteId = request.params.websiteId;
    websiteModel.deleteWebsite(userId, websiteId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.send(err);
        });
}

function updateWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var website = request.body;
    websiteModel.updateWebsite(websiteId, website)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.send(err);
        })
}

function findWebsiteById(request, response) {
    var websiteId = request.params.websiteId;
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
           response.json(website);
        }, function (err) {
            response.send(err);
        });
}

function findWebsitesForUser(request, response){
    var userId = request.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(function (websites) {
            response.json(websites);
        }, function (err) {
            response.send(err);
        });
}

function createWebsite(request, response) {
    var userId = request.params.userId;
    var website = request.body;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            response.json(website);
        }, function (err) {
            response.send(err);
        });
}