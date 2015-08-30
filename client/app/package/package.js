'use strict';

angular.module('nachosStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.package', {
        url: '/package/:name',
        controller: 'Package',
        templateUrl: 'app/package/package.html'
      });
  });
