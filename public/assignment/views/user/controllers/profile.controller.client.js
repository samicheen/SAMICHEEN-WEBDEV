(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
            });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function (response) {
                    var update = response.data;
                    if (update === null){
                        model.updateErrorMessage = "User updation failed";
                    }
                    else{
                        model.updateSuccessMessage = "User updated successfuly";
                    }
                });
        }

        function unregisterUser(userId) {
            userService.unregisterUser(userId);
            $location.url("/login");
        }
    }
})();
