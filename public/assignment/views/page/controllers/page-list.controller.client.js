(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController)

    function pageListController($routeParams, pageService) {
        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPagesForWebsite(websiteId);
        }
        init();

    }
})();
