(function (){
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http){
        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.updateWebsite = updateWebsite;

        function findWebsiteById(websiteId)
        {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(userId, website){
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function updateWebsite(websiteId, website){
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(userId, websiteId){
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.delete(url);
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