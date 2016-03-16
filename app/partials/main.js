(function () {

    angular.module('app').controller('main',
    ['$location'/*,'logger'*/, 'datacontext', controller]);

    function controller($location/*, logger*/, datacontext) {

        var vm = this;

        vm.errorMessage = '';
        //vm.getEntities = getEntities;
        vm.addEntity = addEntity;
        vm.removeEntity = removeEntity;
        vm.editEntity = editEntity;

        vm.entities = [];

        getEntities();

        function getEntities() {

            datacontext.getAllEntities()
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

            datacontext.deleteEntity(entityR.__PrimaryKey);
            
            $location.path('/');
        };

        function editEntity(index) {
            $location.path('/entity/edit/' + index);
        };

    }

})();