(function () {
//immediately invoked function expressions
    angular
        .module("WebAppMaker")
        .controller("homeController", homeController); //function name with same name which implements the controller

    function homeController($location, userService, $rootScope) {
        var model = this;
        model.login = login;
        function init(){

        }
        init();

        function login(){

        }
    }
})();
