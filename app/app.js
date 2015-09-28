'use strict';
 
/* App Module */

angular.module('crudtableApp', [
  'ngRoute',
  'crudtableControllers'
])
    .config(
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/partials/main.html',
                controller: 'MainController'
            }).
            when('/users/edit/:userId', {
                templateUrl: 'app/partials/edit.html',
                controller: 'EditController'
            }).
            when('/users/add', {
                templateUrl: 'app/partials/add.html',
                controller: 'AddController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
);