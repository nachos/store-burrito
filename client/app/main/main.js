'use strict';

angular.module('nachosStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.main', {
        url: '/',
        controller: 'Main',
        templateUrl: 'app/main/main.html'
      });
  });
