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
            websiteService.findWebsitesForUser(userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

    }
})();
