(function () {

    angular.module('app').controller('add',
    ['$scope','$location', 'datacontext', addController]);

    function addController($scope, $location, datacontext) {
        var vm = this;
        vm.cancelAdd = cancelAdd;
        vm.addEntity = addEntity;

        function cancelAdd() {
            $location.path('/');
        };

        function addEntity() {
            datacontext.createEntity({
                Name: vm.entity.Name,
                EMail: vm.entity.EMail,
                Birthday: new Date(),
                Gender: "Male",
                Karma: vm.entity.Karma
            }).then(success, failed);

            function success(response) {
                $location.path('/');
            }

            function failed(error) {
                console.log('Error_createEntity ' + JSON.stringify(error));
                $location.path('/');
            }

        };
    }
})();