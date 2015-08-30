'use strict';

angular.module('nachosStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell', {
        abstract: true,
        templateUrl: 'app/shell/shell.html'
      });
  });
