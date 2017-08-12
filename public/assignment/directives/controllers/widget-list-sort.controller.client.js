(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("sortController", sortController); //function name with same name which implements the controller

    function sortController($routeParams, widgetService) {
        var model = this;
        var pageId = $routeParams.pageId;
        model.sort = sort;
        function init(){

        }
        init();

        function sort(startIndex, endIndex) {
            widgetService.sort(pageId, startIndex, endIndex);
        }
    }
})();
