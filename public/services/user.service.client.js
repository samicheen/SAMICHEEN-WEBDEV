(function (){
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http){
        var _api = {
            "login": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "unregisterUser": unregisterUser,
            "checkLogin": checkLogin
        };

        return _api;

        function checkLogin() {
            var url = "/api/checkLogin";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function registerUser(user)
        {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                });
        }

        function updateUser(userId, user)
        {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function unregisterUser(userId)
        {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function login(username, password)
        {
            var url = "/api/login/";
            return $http.post(url, {username: username, password: password})
                .then(function(response){
                    return response.data;
                }, function (err) {
                    return null;
                });
        }

        function findUserById(userId){
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();