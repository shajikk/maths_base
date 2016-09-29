(function() {

  var mod = angular.module("myApp.tag", []);

  mod.directive('tagControls', function() {
      return {
          restrict: 'E',
          scope: { obj: '=' },
          templateUrl: 'tag_lib/tagControls.html',
      };
  });
  
})();
