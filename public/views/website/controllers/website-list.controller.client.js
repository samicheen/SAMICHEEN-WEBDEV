(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController)

    function websiteListController(websiteService, user) {
        var model = this;
        var userId = user._id;

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
