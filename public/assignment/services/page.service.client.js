(function (){
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService($http){
        this.findPagesForWebsite = findPagesForWebsite;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function findPageById(pageId)
        {
            var url = "/api/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(websiteId, page){
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function updatePage(pageId, page){
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId){
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function findPagesForWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();