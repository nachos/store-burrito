'use strict';

angular.module('nachosStoreApp')
  .controller('Package', function ($scope, $stateParams, $timeout, $mdTheming, notify) {
    var server = require('nachos-server-api');
    var packages = require('nachos-packages');

    var client = server();
    var packageName = $stateParams.name;

    client.packages.byName({}, {package: packageName})
      .then(function (pkg) {
        $timeout(function () {
          $scope.package = pkg;
        });

        //if (pkg.type === 'dip') {
        //  changeColor('orange');
        //}

        return pkg;
      })
      .then(function (pkg) {
        return packages.getPackage(pkg.name, pkg.type);
      })
      .then(function (local) {
        if (local) {
          $timeout(function () {
            $scope.local = local;
          });
        }
      })
      .catch(function (err) {
        notify(err);
      });
  });