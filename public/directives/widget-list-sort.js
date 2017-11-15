(function () {
//immediately invoked function expressions
    angular
        .module("Directives", [])
        .directive("widgetListSortable", widgetListDirective); //module name and any dependencies if any: ngRoute is dependency

    function widgetListDirective() {
        function linkFunction(scope, element) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                start: function (event , ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    scope.sortController.sort(startIndex, endIndex);
                }
            });
        }
        return {
            link: linkFunction,
            controller: "sortController",
            controllerAs: "sortController"
        }
    }
})();