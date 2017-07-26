(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController)

    function widgetEditController($routeParams, $location, widgetService) {
        var model = this;

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getEditPath = getEditPath;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            model.widgets = widgetService.findWidgetsForPage(pageId);
            model.widget = widgetService.findWidgetById(widgetId);
        }
        init();

        function updateWidget(widget){
            widgetService.updateWidget(widget._id, widget);
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId);
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
        }

        function getEditPath(widget) {
            var path = "widget/editors/widget-"+widget.widgetType.toLowerCase()+"-edit.view.client.html";
            return path;
        }
    }
})();
