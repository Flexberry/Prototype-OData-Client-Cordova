(function () {

    angular.module('app').controller('edit',
    ['$scope', '$location', '$routeParams', 'datacontext', editController]);

    function editController($scope, $location, $routeParams, datacontext) {
        
        var vm = this;
        vm.entityKey = $routeParams.entityId;

        vm.cancelChanges = cancelChanges;
        vm.saveChanges = saveChanges;

        getEntity();

        function getEntity() {

            datacontext.getEntity(vm.entityKey)
                       .then(success, failed);

            function success(response) {
                vm.entity = response;
            }
            function failed(error) {
                console.log('Error_getEntity ' + JSON.stringify(error));
            }
        }

        function cancelChanges() {
            $location.path('/');
        };

        function saveChanges() {
            datacontext.patchEntity(vm.entityKey, vm.entity);

            $location.path('/');
        };
    }
})();