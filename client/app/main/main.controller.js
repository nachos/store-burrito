'use strict';

angular.module('nachosStoreApp')
  .controller('Main', function ($scope, $timeout) {
    var server = require('nachos-server-api');
    var client = server();

    client.packages.all()
      .then(function(packages) {
        $timeout(function () {
          $scope.packages = packages;
        });
      });

    //changeColor('blue');
  });