(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("widgetSearchController", widgetSearchController);

    function widgetSearchController($location, $routeParams, widgetService, flickrService) {
        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

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

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.name = "";
            model.widget.url = url;
            widgetService
                .updateWidget(widgetId, model.widget)
                .then(function (widget) {
                    model.widget = widget;
                    $location.url('/user/'+ userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                });
        }
    }
})();
