(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init(){
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user)
        {
            var update = userService.updateUser(user._id, user);
            if (update === null){
                model.updateErrorMessage = "User updation failed";
            }
            else{
                model.updateSuccessMessage = "User updated successfuly";
            }
        }

        function unregisterUser(userId){
            userService.unregisterUser(userId);
            $location.url("/login");
        }
    }
})();
