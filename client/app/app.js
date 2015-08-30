'use strict';

angular.module('nachosStoreApp', ['ngMaterial', 'ui.router'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  });