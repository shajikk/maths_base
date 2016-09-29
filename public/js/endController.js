(function() {

  var mod = angular.module("myApp.end", []);

  mod.controller('endController', function($scope, $location, accessFactory, $routeParams) {

    this.count = $routeParams.count;


  });

})();
