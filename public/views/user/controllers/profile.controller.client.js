(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($location, userService, user) {
        var model = this;
        var userId = user._id;

        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {
            userService.findUserById(userId)
                .then(function (user) {
                    model.user = user;
            });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function () {
                    model.updateSuccessMessage = "User updated successfuly";
                });
        }

        function unregisterUser(userId) {
            userService.unregisterUser(userId)
                .then(function () {
                    $location.url("/login");
                });
        }
    }
})();
