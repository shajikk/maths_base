(function() {

  var mod = angular.module("myApp.root", []);

  mod.controller('rootController', function($scope, $location, accessFactory) {

    this.Next = function () {
      var loc = '/run/1';
      $location.path(loc);

      //var d = accessFactory.get_data();
      //var aaa = accessFactory.factory_access()
      //alert(d.s);

    };

  });

})();
