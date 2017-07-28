(function (){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, userService)
    {
        var model = this;

        model.registerUser = registerUser;

        function init(){

        }
        init();

        function registerUser(user){
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        return userService.registerUser(user)
                    }
                    else{
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();