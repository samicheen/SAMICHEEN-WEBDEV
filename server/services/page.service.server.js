var app = require("../../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPagesForWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var _pages = [];

    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            _pages.push(pages[p]);
        }
    }
    response.json(_pages);
}

function findPageById(request, response) {
    var pageId = request.params.pageId;
    for (var p in pages){
        if (pages[p]._id === pageId)
        {
            response.json(pages[p]);
            return;
        }
    }
    response.sendStatus(404);
}

function createPage(request, response) {
    var websiteId = request.params.websiteId;
    var page = request.body;
    page._id = (new Date()).getTime()+"";
    page.websiteId = websiteId;
    pages.push(page);
    response.json(page);
}

function updatePage(request, response) {
    var pageId = request.params.pageId;
    var page = request.body;
    for (var p in pages){
        if (pages[p]._id === pageId){
            pages[p] = page;
            response.json(pages[p]);
            return;
        }
    }
    response.sendStatus(404);
}

function deletePage(request, response) {
    var pageId = request.params.pageId;
    for (var p in pages){
        if (pages[p]._id === pageId)
        {
            pages.splice(p, 1);
            response.send("success");
            return;
        }
    }
    return response.sendStatus(404);
}