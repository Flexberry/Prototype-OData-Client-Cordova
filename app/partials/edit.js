(function () {

    angular.module('app').controller('edit',
    ['$scope', '$location', '$routeParams', 'datacontext', '$uibModal', editController]);

    function editController($scope, $location, $routeParams, datacontext, $uibModal) {
        
        var vm = this;
        vm.entityName = 'FlexberryEmberDemoSuggestions';
        vm.entityKey = $routeParams.entityId;
        vm.entity = [];
        vm.entityL = [];

        vm.cancelChanges = cancelChanges;
        vm.saveChanges = saveChanges;
        
        getEntity();

        function cancelChanges() {
            $location.path('/');
        };

        function saveChanges() {

            vm.updateEntity = {
                Address: vm.entity.Address,
                Text: vm.entity.Text,
                Votes: vm.entity.Votes,
                Moderated: vm.entity.Moderated,
                "Author@odata.bind": vm.entityL.entityName + "(" + vm.entityLookup.__PrimaryKey + ")",
                "Type@odata.bind": vm.entityL.entityName2 + "(" + vm.entityLookup2.__PrimaryKey + ")"
            };

            datacontext.patchEntity(vm.entityName, vm.entityKey, vm.updateEntity);

            vm.Details.forEach(function (item, i, arr) {

                if (item.__PrimaryKey != undefined) {
                    datacontext.patchEntity(
                        vm.DetailsName,
                        item.__PrimaryKey,
                        {
                            Text: item.Text,
                            Votes: item.Votes,
                            Moderated: item.Moderated
                        }
                    );
                }
                else{
                    datacontext.createEntity(
                        vm.DetailsName,
                        {
                            Text: item.Text,
                            Votes: item.Votes,
                            Moderated: item.Moderated,
                            "Author@odata.bind": vm.entityL.entityName + "(" + vm.entityLookup.__PrimaryKey + ")",
                            "Suggestion@odata.bind": "FlexberryEmberDemoSuggestions(" + vm.entityKey + ")"
                        }
                    );
                }
            });

            $location.path('/');
        };

        function getEntity() {

            datacontext.getEntity(vm.entityName, vm.entityKey, "")
                       .then(success, failed);

            function success(response) {
                vm.entity = response;
            }
            function failed(error) {
                console.log('Error_getEntity ' + JSON.stringify(error));
            }
        }

//LookUp 1
        vm.entityLookup = [];
        vm.entityL.entityName = "FlexberryEmberDemoApplicationUsers";

        vm.lookup = lookup;
        vm.clearLookup = clearLookup;

        getEntityLookup();
        
        function lookup(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/lookup/lookupAuthor.html',
                controller: 'LookUpCtrl',
                size: size,
                resolve: {
                    entityName: function () {
                        return vm.entityL.entityName;
                    }
                }
            });

            modalInstance.result.then(function (selectedVal) {
                vm.entityLookup = selectedVal;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function clearLookup() {
            vm.entityLookup = [];
        }

        function getEntityLookup() {
            datacontext.getEntity(vm.entityName, vm.entityKey, "/Author")
                       .then(success, failed);

            function success(response) {
                vm.entityLookup = response;
            }
            function failed(error) {
                console.log('Error_getEntity ' + JSON.stringify(error));
            }
        }

//LookUp 2
        vm.entityLookup2 = [];
        vm.entityL.entityName2 = "FlexberryEmberDemoSuggestionTypes";

        vm.lookup2 = lookup2;
        vm.clearLookup2 = clearLookup2;

        getEntityLookup2();

        function lookup2(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/lookup/lookupType.html',
                controller: 'LookUpCtrl',
                size: size,
                resolve: {
                    entityName: function () {
                        return vm.entityL.entityName2;
                    }
                }
            });

            modalInstance.result.then(function (selectedVal) {
                vm.entityLookup2 = selectedVal;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function clearLookup2() {
            vm.entityLookup2 = [];
        }

        function getEntityLookup2() {
            datacontext.getEntity(vm.entityName, vm.entityKey, "/Type")
                       .then(success, failed);

            function success(response) {
                vm.entityLookup2 = response;
            }
            function failed(error) {
                console.log('Error_getEntity ' + JSON.stringify(error));
            }
        }

//Детейлы
        vm.DetailsName = "FlexberryEmberDemoComments";
        vm.Details = [];

        vm.DetailAdd = DetailAdd;
        vm.removeDetail = removeDetail;

        getDetails();


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

            if (entityR.__PrimaryKey != undefined)
                datacontext.deleteEntity(vm.DetailsName, entityR.__PrimaryKey);
        };

        function getDetails() {
            datacontext.getAllEntities("FlexberryEmberDemoSuggestions(" + vm.entityKey + ")/Comments")
                       .then(success, failed);

            function success(response) {
                vm.Details = response;
            }
            function failed(error) {
                console.log('Error_getEntity ' + JSON.stringify(error));
            }
        }

    }
})();