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
            pageService.findPagesForWebsite(websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

    }
})();
