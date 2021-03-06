(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, pageService, user) {
        var model = this;

        model.createPage = createPage;

        var userId = user._id;
        var websiteId = $routeParams["wid"];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            pageService.findPagesForWebsite(userId, websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page){
            pageService.createPage(websiteId, page)
                .then(function () {
                    $location.url("/website/"+ websiteId + "/page");
                });
        }
    }
})();
