(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController)

    function websiteNewController($routeParams, $location, websiteService) {
        var model = this;

        model.createWebsite = createWebsite;

        var userId = $routeParams["uid"];

        function init(){
            model.userId = userId;
            model.websites = websiteService.findWebsitesForUser(userId);
        }
        init();

        function createWebsite(website){
           websiteService.createWebsite(userId, website);
           $location.url("/user/" + userId + "/website");
        }
    }
})();
