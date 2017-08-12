(function (){
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "afd8b684e3ba48cfda3a1445f6a00155";
        var secret = "172fe1a90e47306a";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        urlBase += "&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchText) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();