(function (){
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        this.findPagesForWebsite = findPagesForWebsite;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function findPageById(pageId)
        {
            for (var p in pages){
                if (pages[p]._id === pageId)
                {
                    return angular.copy(pages[p]);
                }
            }
        }

        function createPage(websiteId, page){
            page._id = (new Date()).getTime()+"";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function updatePage(pageId, page){
            for (var p in pages){
                if (pages[p]._id === pageId){
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        function deletePage(pageId){
            for (var p in pages){
                if (pages[p]._id === pageId)
                {
                    pages.splice(p, 1);
                }
            }
        }

        function findPagesForWebsite(websiteId){
            var _pages = [];

            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    _pages.push(pages[p]);
                }
            }
            if (_pages === null)
            {
                return null;
            }
            else
            {
                return _pages;
            }
        }
    }
})();