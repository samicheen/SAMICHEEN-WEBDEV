(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController)

    function websiteListController($routeParams, websiteService) {
        var model = this;
        var userId = $routeParams["uid"];

        function init(){
            model.userId = userId;
            model.websites = websiteService.findWebsitesForUser(userId);
        }
        init();

    }
})();
