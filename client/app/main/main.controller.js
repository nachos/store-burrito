'use strict';

angular.module('nachosStoreApp')
  .controller('Main', function ($scope, $timeout, notify) {
    var server = require('nachos-server-api');
    var client = server();

    client.packages.all()
      .then(function(packages) {
        $timeout(function () {
          notify('done');

          $scope.packages = packages;
        });
      });
  });