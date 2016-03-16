(function () {

    angular.module('app').factory('datacontext',
           ['$http', datacontext]);

    function datacontext($http) {

        var serviceRoot = 'http://flexberry-ember-demo.azurewebsites.net/odata/';
        var entityName = 'FlexberryEmberDemoApplicationUsers';

        var headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

        var service = {
            getEntity: getEntity,
            getAllEntities: getAllEntities,
            createEntity: createEntity,
            deleteEntity: deleteEntity,
            patchEntity: patchEntity
        };
        return service;

        function getEntity(key) {

            var req = {
                method: 'GET',
                url: serviceRoot + entityName + '(' + key + ')',
                headers: headers,
                data: null
            };

            return $http(req).then(
                function (response) {
                    return response.data;
                },
                function (response) {
                    return response.status;
                });
        }
        
        function getAllEntities() {

            var req = {
                method: 'GET',
                url: serviceRoot + entityName,
                headers: headers,
                data: null
            };

            return $http(req).then(
                function (response) {
                    return response.data.value;
                },
                function (response) {
                    return response.status;
                });
        }

        function createEntity(initialValues) {
            
            var req = {
                method: 'POST',
                url: serviceRoot + entityName,
                headers: headers,
                data: initialValues
            };
            
            return $http(req).then(
                function (response) {
                    return response.data.value;
                },
                function (response) {
                    return response.status;
                });
        }

        function deleteEntity(key) {

            var req = {
                method: 'DELETE',
                url: serviceRoot + entityName + '(' + key + ')',
                headers: headers,
                data: null
            };

            return $http(req).then(
                function (response) {
                    return response.data.value;
                }, function (response) {
                    return response.status;
                });
        }
        
        function patchEntity(key, initialValues) {

            var req = {
                method: 'PATCH',
                url: serviceRoot + entityName + '(' + key + ')',
                headers: headers,
                data: initialValues
            };

            return $http(req).then(
                function (response) {
                    return response.data;
                }, function (response) {
                    return response.status;
                });

        }

    }
})();