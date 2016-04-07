(function () {

    angular.module('app').controller('LookUpDetailCtrl',
        ['$scope', '$uibModalInstance', 'Detail', LookUpDetailCtrl]);

    function LookUpDetailCtrl($scope, $uibModalInstance, Detail) {

        $scope.Detail = Detail;

        $scope.ok = function() {
            $uibModalInstance.close($scope.Detail);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();