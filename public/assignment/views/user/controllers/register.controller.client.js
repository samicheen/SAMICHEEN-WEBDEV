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
                .then(function (user_r) {
                    var _user = user_r;
                    if(_user === "0"){
                        return userService.registerUser(user)
                    }
                    else {
                        model.error = "User already exists";
                    }
                })
                .then(function (user_re) {
                    _user = user_re;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();