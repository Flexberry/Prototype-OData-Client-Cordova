(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/partials/main.html',
                controller: 'main'
            }).
            when('/entity/edit/:entityId', {
                templateUrl: 'app/partials/edit.html',
                controller: 'edit'
            }).
            when('/entity/add', {
                templateUrl: 'app/partials/add.html',
                controller: 'add'
            }).
            otherwise({
              redirectTo: '/'
          });
    }
})();