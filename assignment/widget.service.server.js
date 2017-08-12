var app = require("../express");

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"Heading"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
        "name":"Heading"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "name":"Image"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name":"HTML"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
        "name":"Heading"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E", "name":"YouTube" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name":"HTML"}
];

var widgetList = [
    { "_id": "1", "widgetType": "HEADING", "wdname": "Header"},
    { "_id": "2", "widgetType": "HTML", "wdname": "HTML"},
    { "_id": "3", "widgetType": "YOUTUBE", "wdname":"YouTube"},
    { "_id": "4", "widgetType": "IMAGE", "wdname":"Image"}
];

app.get("/api/widget/widgets", getWidgetList);
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsForPage);
app.get("/api/page/:pageId/widget-sort", sort);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/assignment/uploads' });
app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var name = req.body.name;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/'+filename;
    widget.name = name;
    updateWidgetById(widgetId, widget);
    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    res.redirect(callbackUrl);
}

function getWidgetList(request, response) {
    response.json(widgetList);
}

function sort(request, response){
    //var pageId = request.params.pageId;
    //var page = pageService.findById(pageId);
    var startIndex = request.query.startIndex;
    var endIndex = request.query.endIndex;
    widgets.splice(endIndex, 0, (widgets.splice(startIndex, 1))[0]);
}

function createWidget(request, response) {
    var pageId = request.params.pageId;
    var widget = request.body;
    widget._id = (new Date()).getTime()+"";
    widget.pageId = pageId;
    widgets.push(widget);
    response.json(widget);
}

function checkWidget(widget)
{
    if (typeof widget.name === 'undefined'){
        return false;
    }
    else {
        return true;
    }
}

function findWidgetsForPage(request, response) {
    var pageId = request.params.pageId;
    var _widgets = [];

    for (var wg in widgets) {
        if (widgets[wg].pageId === pageId && checkWidget(widgets[wg])) {
            _widgets.push(widgets[wg]);
        }
    }
    response.json(_widgets);
}

function getWidgetById(widgetId) {
    for (var wg in widgets){
        if (widgets[wg]._id === widgetId){
            return widgets[wg];
        }
    }
}

function updateWidgetById(widgetId, widget) {
    for (var wg in widgets){
        if (widgets[wg]._id === widgetId){
            widgets[wg] = widget;
        }
    }
}

function findWidgetById(request, response) {
    var widgetId = request.params.widgetId;
    for (var wg in widgets){
        if (widgets[wg]._id === widgetId)
        {
            response.json(widgets[wg]);
            return;
        }
    }
    response.sendStatus(404);
}

function updateWidget(request, response) {
    var widgetId = request.params.widgetId;
    var widget = request.body;
    for (var wg in widgets){
        if (widgets[wg]._id === widgetId){
            widgets[wg] = widget;
            response.json(widgets[wg]);
            return;
        }
    }
    response.sendStatus(404);
}

function deleteWidget(request, response) {
    var widgetId = request.params.widgetId;
    for (var wg in widgets){
        if (widgets[wg]._id === widgetId)
        {
            widgets.splice(wg, 1);
            response.send("success");
            return;
        }
    }
    response.sendStatus(404);
}
