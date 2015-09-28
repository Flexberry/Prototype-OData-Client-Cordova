'use strict';
 
/* Controllers */

var crudtableControllers = angular.module('crudtableControllers', []);

crudtableControllers.
    controller('MainController', function ($scope, $location) {

        if (localStorage.getItem('usersCRUDApp')) {
            $scope.users = JSON.parse(localStorage.getItem('usersCRUDApp'));
        }
        else {
            $scope.users = [];
        }

        $scope.addUser = function () {
            $location.path('/users/add');
        };

        $scope.editUser = function (index) {
            $location.path('/users/edit/'+index);
        };

        $scope.removeUser = function (index) {
            $scope.users.splice(index, 1);
            localStorage.setItem('usersCRUDApp', JSON.stringify($scope.users));
        };
});

crudtableControllers.controller('EditController',
  function ($scope, $routeParams, $location) {

      $scope.userId = $routeParams.userId;

      if (localStorage.getItem('usersCRUDApp')) {
          $scope.users = JSON.parse(localStorage.getItem('usersCRUDApp'));
      }
      else {
          $scope.users = [];
      }

      $scope.cancelChanges = function () {
          //отмена изменений
          $location.path('/');
      };
      
      $scope.saveChanges = function () {
          //сохранить изменения в локал сторедж
          localStorage.setItem('usersCRUDApp', JSON.stringify($scope.users));
          $location.path('/');
      };
  });

crudtableControllers.controller('AddController',
  function ($scope, $location) {

      $scope.cancelAdd = function () {
          //отмена изменений
          $location.path('/');
      };

      $scope.addUser = function () {
          //сохранить изменения в локал сторедж
          if (localStorage.getItem('usersCRUDApp')) {
              $scope.users = JSON.parse(localStorage.getItem('usersCRUDApp'));
          }
          else
          {
              $scope.users = [];
          }

          $scope.users.push($scope.user);

          localStorage.setItem('usersCRUDApp', JSON.stringify($scope.users));
          $location.path('/');
      };
  });