(function () {

    angular.module('app').controller('add',
    ['$scope', '$location', 'datacontext', '$uibModal', addController]);

    function addController($scope, $location, datacontext, $uibModal) {
        var vm = this;
        vm.entityName = 'FlexberryEmberDemoSuggestions';
        vm.entity = [];

        //Базовые функции
        vm.cancelAdd = cancelAdd;
        vm.addEntity = addEntity;

        function cancelAdd() {
            $location.path('/');
        };

        function addEntity() {

            datacontext.createEntity(
                vm.entityName,
                {
                    Address: vm.entity.Address,
                    Text: vm.entity.Text,
                    Date: new Date(),
                    Votes: vm.entity.Votes,
                    Moderated: vm.entity.Moderated,
                    "Author@odata.bind": vm.entity.entityName + "(" + vm.entity.entityLookup.__PrimaryKey + ")",
                    "Type@odata.bind": vm.entity.entityName2 + "(" + vm.entity.entityLookup2.__PrimaryKey + ")"
                }).then(success, failed);

            function success(response) {
                //сохранение детейлов
                vm.Details.forEach(function (item, i, arr) {
                    datacontext.createEntity(
                        vm.DetailsName,
                        {
                            Text: item.Text,
                            Votes: item.Votes,
                            Moderated: item.Moderated,
                            "Author@odata.bind": vm.entity.entityName + "(" + vm.entity.entityLookup.__PrimaryKey + ")",
                            "Suggestion@odata.bind": "FlexberryEmberDemoSuggestions(" + response + ")"
                        }
                    );
                });
                
                $location.path('/');
            }

            function failed(error) {
                console.log('Error_createEntity: ' + JSON.stringify(error));
                $location.path('/');
            }

        };

        //LookUp
        vm.entity.entityLookup = [];
        vm.entity.entityName = "FlexberryEmberDemoApplicationUsers";
        vm.lookup = lookup;
        vm.clearLookup = clearLookup;

        function lookup(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/lookup/lookupAuthor.html',
                controller: 'LookUpCtrl',
                size: size,
                resolve: {
                    entityName: function () {
                        return vm.entity.entityName;
                    }
                }
            });

            modalInstance.result.then(function (selectedVal) {
                vm.entity.entityLookup = selectedVal;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function clearLookup() {
            vm.entity.entityLookup = [];
        }

        //LookUp 2
        vm.entity.entityLookup2 = [];
        vm.entity.entityName2 = "FlexberryEmberDemoSuggestionTypes";
        vm.lookup2 = lookup2;
        vm.clearLookup2 = clearLookup2;

        function lookup2(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/lookup/lookupType.html',
                controller: 'LookUpCtrl',
                size: size,
                resolve: {
                    entityName: function () {
                        return vm.entity.entityName2;
                    }
                }
            });

            modalInstance.result.then(function (selectedVal) {
                vm.entity.entityLookup2 = selectedVal;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function clearLookup2() {
            vm.entity.entityLookup2 = [];
        }

        //Детейлы
        vm.Details = [];
        vm.DetailsName = "FlexberryEmberDemoComments";
        
        vm.DetailAdd = DetailAdd;
        vm.removeDetail = removeDetail;

        function DetailAdd(index) {

            if (index == undefined)
                Detail = [];
            else
                Detail = vm.Details[index];

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/lookupDetail/lookupDetail.html',
                controller: 'LookUpDetailCtrl',
                resolve: {
                    Detail: function () {
                        return Detail;
                    }
                }
            });

            modalInstance.result.then(function (newDetail) {
                if (index == undefined)
                    vm.Details.push(newDetail);
                else
                    vm.Details[index] = newDetail;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function removeDetail(entityR, index) {
            vm.Details.splice(index, 1);
        };

    }
})();