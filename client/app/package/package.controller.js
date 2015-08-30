'use strict';

angular.module('nachosStoreApp')
  .controller('Package', function ($stateParams) {
    console.log($stateParams.item);
  });