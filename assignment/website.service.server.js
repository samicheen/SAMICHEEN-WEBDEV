var app = require("../express");

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
app.delete("/api/website/:websiteId", deleteWebsite);

function deleteWebsite(request, response) {
    var websiteId = request.params.websiteId;
    for (var w in websites){
        if (websites[w]._id === websiteId)
        {
            websites.splice(w, 1);
            response.send("success");
            return;
        }
    }
    response.sendStatus(404);
}

function updateWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var website = request.body;
    for (var w in websites){
        if (websites[w]._id === websiteId){
            websites[w] = website;
            response.send(websites[w]);
            return;
        }
    }
    response.sendStatus(404);
}

function findWebsiteById(request, response) {
    var websiteId = request.params.websiteId;
    for (var w in websites){
        if (websites[w]._id === websiteId)
        {
            response.json(websites[w]);
            return;
        }
    }
    response.sendStatus(404);
}

function findWebsitesForUser(request, response){
    var userId = request.params.userId;
    var sites = [];
    for (var w in websites) {
        if (websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    response.json(sites);
}

function createWebsite(request, response) {
    var userId = request.params.userId;
    var website = request.body;
    website._id = (new Date()).getTime()+"";
    website.developerId = userId;
    websites.push(website);
    response.json(website);
}