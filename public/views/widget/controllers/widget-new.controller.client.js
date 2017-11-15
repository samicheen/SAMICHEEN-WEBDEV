(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService, user) {
        var model = this;

        model.createWidget = createWidget;

        var userId = user._id;
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            widgetService.findWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService.getWidgetList()
                .then(function (widgetList) {
                    model.widgetList = widgetList;
                });
        }
        init();

        function createWidget(widget){
            widgetService.createWidget(pageId, widget)
                .then(function (response) {
                   var widget = response.data;
                   $location.url("/website/"+ websiteId + "/page/"+ pageId + "/widget/"+ widget._id);
                });
        }
    }
})();
