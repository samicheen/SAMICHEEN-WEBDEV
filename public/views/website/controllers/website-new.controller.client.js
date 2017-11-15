(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, websiteService, user) {
        var model = this;

        model.createWebsite = createWebsite;

        var userId = user._id;
        function init(){
            model.userId = userId;
            websiteService.findWebsitesForUser(userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website){
           websiteService.createWebsite(userId, website)
               .then(function () {
                   $location.url("/website");
               });
        }
    }
})();
