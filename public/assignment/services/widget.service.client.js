(function (){
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService(){
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

        this.findWidgetsForPage = findWidgetsForPage;
        this.getWidgetList = getWidgetList;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;

        function getWidgetList() {
            return widgetList;
        }

        function findWidgetById(widgetId) {
            for (var wg in widgets){
                if (widgets[wg]._id === widgetId)
                {
                    return angular.copy(widgets[wg]);
                }
            }
        }

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime()+"";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function updateWidget(widgetId, widget){
            for (var wg in widgets){
                if (widgets[wg]._id === widgetId){
                    widgets[wg] = widget;
                    return;
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for (var wg in widgets){
                if (widgets[wg]._id === widgetId)
                {
                    widgets.splice(wg, 1);
                }
            }
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

        function findWidgetsForPage(pageId){
            var _widgets = [];

            for (var wg in widgets) {
                if (widgets[wg].pageId === pageId && checkWidget(widgets[wg])) {
                    _widgets.push(widgets[wg]);
                }
            }
            if (_widgets === null)
            {
                return null;
            }
            else
            {
                return _widgets;
            }
        }
    }
})();