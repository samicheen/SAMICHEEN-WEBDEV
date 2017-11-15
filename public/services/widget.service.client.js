(function (){
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService($http){
        this.findWidgetsForPage = findWidgetsForPage;
        this.getWidgetList = getWidgetList;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;
        this.sort = sort;

        function sort(pageId, startIndex, endIndex) {
            var url = "/api/page/" + pageId + "/widget-sort?startIndex=" + startIndex +"&endIndex=" + endIndex;
            return $http.get(url);
        }

        function getWidgetList() {
            var url = "/api/widget/widgets";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function updateWidget(widgetId, widget){
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId){
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function findWidgetsForPage(pageId){
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();