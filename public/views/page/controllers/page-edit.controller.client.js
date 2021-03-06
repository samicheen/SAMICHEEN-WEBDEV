(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, pageService, user) {
        var model = this;

        model.deletePage = deletePage;
        model.updatePage = updatePage;

        var userId = user._id;
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            pageService.findPagesForWebsite(websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService.findPageById(pageId)
                .then(function (page) {
                    model.page = page;
                });
        }
        init();

        function updatePage(page){
            pageService.updatePage(page._id, page)
                .then(function () {
                    $location.url("/website/"+ websiteId + "/page");
                });
        }

        function deletePage(pageId){
            pageService.deletePage(pageId)
                .then(function () {
                    $location.url("/website/"+ websiteId + "/page");
                });
        }
    }
})();
