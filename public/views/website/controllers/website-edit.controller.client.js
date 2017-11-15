(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService, user) {
        var model = this;

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        var userId = user._id;
        var websiteId = $routeParams["wid"];

        function init(){
            model.userId = userId;
            websiteService.findWebsitesForUser(userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService.findWebsiteById(websiteId)
                .then(function (website) {
                    model.website = website;
                })
        }
        init();

        function updateWebsite(website){
            websiteService.updateWebsite(website._id, website)
                .then(function () {
                    $location.url("/website");
                });
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(userId, websiteId)
                .then(function () {
                    $location.url("/website");
                });
        }
    }
})();
