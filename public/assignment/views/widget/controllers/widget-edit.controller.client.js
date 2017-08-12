(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController)

    function widgetEditController($routeParams, $location, widgetService, $sce) {
        var model = this;

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getEditPath = getEditPath;
        model.getIncludePath = getIncludePath;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            widgetService.findWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService.findWidgetById(widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }
        init();

        function updateWidget(widget){
            widgetService.updateWidget(widget._id, widget)
                .then(function () {
                    $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
                });
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
                });
        }

        function getEditPath(widget) {
            var path = "views/widget/editors/widget-" + widget.widgetType.toLowerCase() + "-edit.view.client.html";
            return path;
        }

        function getIncludePath(widget) {
            var path = "views/widget/templates/widget-" + widget.widgetType.toLowerCase() + ".view.client.html";
            return path;
        }

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl){
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts =  linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();
