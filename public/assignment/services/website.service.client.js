(function (){
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http){
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.updateWebsite = updateWebsite;

        function findWebsiteById(userId, websiteId)
        {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(userId, website){
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function updateWebsite(userId, website){
            for (var w in websites){
                if (websites[w]._id === userId){
                    websites[w] = website;
                    return;
                }
            }
            return null;
        }

        function deleteWebsite(websiteId){
            for (var w in websites){
                if (websites[w]._id === websiteId)
                {
                    websites.splice(w, 1);
                }
            }
        }

        function findWebsitesForUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();