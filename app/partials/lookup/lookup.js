(function () {

    angular.module('app').controller('LookUpCtrl',
        ['$scope', '$uibModalInstance', 'entityName', 'datacontext', LookUpCtrl]);

    function LookUpCtrl($scope, $uibModalInstance, entityName, datacontext) {

        $scope.selected = {
            entity: []
        };

        $scope.ok = function() {
            $uibModalInstance.close($scope.selected.entity);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        getEntities();

        function getEntities() {
            datacontext.getAllEntities(entityName)
                           .then(success, failed);

            function success(response) {
                $scope.entities = response;
            }

            function failed(error) {
                console.log('Error_getAllEntities ' + JSON.stringify(error));
            }
            
        }
    }
})();