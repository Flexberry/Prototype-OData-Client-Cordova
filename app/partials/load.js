(function () {

    angular.module('app').controller('load',
    ['$scope', 'datacontext', loadController]);

    function loadController($scope, datacontext) {
        $scope.loadData = loadData;

        function loadData() {
            datacontext.loadTodos();
        }
    }
})();