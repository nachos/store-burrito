'use strict';

angular.module('nachosStoreApp')
  .service('notify', function ($mdToast) {
    return function (msg) {
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .parent('.main')
          .position('bottom right')
      );
    }
  });