(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService, $sce) {
        var model = this;

        model.createWidget = createWidget;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgets = widgetService.findWidgetsForPage(pageId);
            model.widgetList = widgetService.getWidgetList();
        }
        init();

        function createWidget(widget){
            var widget = widgetService.createWidget(pageId, widget);
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page/"+ pageId + "/widget/"+ widget._id);
        }
    }
})();
