(function () {

    angular.module('app').factory('datacontext',
           ['$http', datacontext]);

    function datacontext($http) {

        var serviceRoot = 'http://flexberry-ember-demo.azurewebsites.net/odata/';
        var headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

        var service = {
            getEntity: getEntity,
            getAllEntities: getAllEntities,
            createEntity: createEntity,
            deleteEntity: deleteEntity,
            patchEntity: patchEntity,
        };
        return service;

        function getEntity(entityName, key, end) {

            var req = {
                method: 'GET',
                url: serviceRoot + entityName + '(' + key + ')' + end,
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

        function getAllEntities(entityName) {

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

        function createEntity(entityName, initialValues) {
            
            var req = {
                method: 'POST',
                url: serviceRoot + entityName,
                headers: headers,
                data: initialValues
            };
            
            return $http(req).then(
                function (response) {
                    return response.data.__PrimaryKey;
                },
                function (response) {
                    return response.status;
                });
        }

        function deleteEntity(entityName, key) {

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
        
        function patchEntity(entityName, key, initialValues) {

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