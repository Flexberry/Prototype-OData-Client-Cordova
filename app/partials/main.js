(function () {

    angular.module('app').controller('main',
    ['$location', 'datacontext', controller]);

    function controller($location, datacontext) {

        var vm = this;
        vm.entities = [];
        vm.entityName = 'FlexberryEmberDemoSuggestions';

        vm.addEntity = addEntity;
        vm.removeEntity = removeEntity;
        vm.editEntity = editEntity;

        getEntities();

        function getEntities() {

            datacontext.getAllEntities(vm.entityName)
                           .then(success, failed);

            function success(response) {
                    vm.entities = response;
                }

            function failed(error) {
                    console.log('Error_getAllEntities ' + JSON.stringify(error));
                }
         
        }

        function addEntity() {
            $location.path('/entity/add');
        };

        function removeEntity(entityR, index) {
            vm.entities.splice(index, 1);

            datacontext.deleteEntity(vm.entityName, entityR.__PrimaryKey);
            
            $location.path('/');
        };

        function editEntity(index) {
            $location.path('/entity/edit/' + index);
        };

    }

})();