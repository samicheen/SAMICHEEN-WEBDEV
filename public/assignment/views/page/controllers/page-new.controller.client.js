(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController)

    function pageNewController($routeParams, $location, pageService) {
        var model = this;

        model.createPage = createPage;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPagesForWebsite(websiteId);
        }
        init();

        function createPage(page){
            pageService.createPage(websiteId, page);
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page");
        }
    }
})();
