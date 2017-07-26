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
            model.websites = websiteService.findWebsitesForUser(userId);
            model.website = websiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite(website){
            websiteService.updateWebsite(website._id, website);
            $location.url("/user/"+ userId +"/website");
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+ userId +"/website");
        }
    }
})();
