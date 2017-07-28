(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController); //function name with same name which implements the controller

    function loginController($location, userService, $rootScope) {
        var model = this;
        model.login = login;
        function init(){

        }
        init();

        function login(user) {
            if (!user)
            {
                model.errorMessage = "User Not Found"
            }
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (user) {
                    if(user === "0") {
                        model.errorMessage = "User Not Found"
                    }
                    else {
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }
                });
        }
    }
})();
