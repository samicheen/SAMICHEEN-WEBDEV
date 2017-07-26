(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $location, $routeParams, widgetService) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getIncludePath = getIncludePath;
        model.createWidget = createWidget;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgets = widgetService.findWidgetsForPage(pageId);
            model.widgetList = widgetService.getWidgetList();
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl){
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts =  linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getIncludePath(widget) {
            var path = "views/widget/templates/widget-"+widget.widgetType.toLowerCase()+".view.client.html";
            return path;
        }

        function createWidget(widget){
            var widget = widgetService.createWidget(pageId, widget);
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page/"+ pageId + "/widget/"+ widget._id);
        }
    }
})();
