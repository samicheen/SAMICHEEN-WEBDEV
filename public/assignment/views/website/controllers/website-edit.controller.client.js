(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController)

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this;

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        var userId = $routeParams["uid"];
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
                    $location.url("/user/"+ userId +"/website");
                });
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId)
                .then(function () {
                    $location.url("/user/"+ userId +"/website");
                });
        }
    }
})();
