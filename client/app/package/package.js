'use strict';

angular.module('nachosStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.package', {
        url: '/package',
        params: {item: null},
        controller: 'Package',
        templateUrl: 'app/package/package.html'
      });
  });
