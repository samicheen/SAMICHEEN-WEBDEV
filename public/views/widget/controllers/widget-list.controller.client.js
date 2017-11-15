(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $location, $routeParams, widgetService, user) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getIncludePath = getIncludePath;
        model.createWidget = createWidget;

        var userId = user._id;
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
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
            widgetService.createWidget(pageId, widget)
                .then(function (response) {
                    var widget = response.data;
                    $location.url("/website/"+ websiteId + "/page/"+ pageId + "/widget/"+ widget._id);
                });
        }
    }
})();
