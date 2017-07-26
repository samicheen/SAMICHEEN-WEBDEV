(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController)

    function pageEditController($routeParams, $location, pageService) {
        var model = this;

        model.deletePage = deletePage;
        model.updatePage = updatePage;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPagesForWebsite(websiteId);
            model.page = pageService.findPageById(pageId);
        }
        init();

        function updatePage(page){
            pageService.updatePage(page._id, page);
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page");
        }

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page");
        }
    }
})();
