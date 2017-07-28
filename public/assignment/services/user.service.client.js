(function (){
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http){
        var
            _api = {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "unregisterUser": unregisterUser
        };

        return _api;

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function registerUser(user)
        {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function updateUser(userId, user)
        {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function unregisterUser(userId)
        {
            var url = "/api/user/" + userId;
            return $http.delete(url, userId);
        }

        function findUserByUsernameAndPassword(username, password)
        {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(userId){
            var url = "/api/user/" + userId;
            return $http.get(url);
        }
    }
})();