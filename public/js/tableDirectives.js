(function() {

  var mod = angular.module("myApp.table", []);

  mod.directive('tableControls', function() {
      return {
          restrict: 'E',
          scope: { obj: '=' },
          templateUrl: 'table_lib/tableControls.html',
      };
  });
  
  mod.directive('tablePager', function() {
      return {
          restrict: 'E',
          scope: { obj: '=' },
          templateUrl: 'table_lib/tablePager.html',
      };
  });
  
  
  mod.directive('tableSort', function() {
      return {
          restrict: 'E',
          scope: { 
                    obj : '=', 
                    field : '@', 
                    text : '@', 
                    link : '@', 
                 },
          templateUrl: 'table_lib/tableSort.html',
      };
  });

})();
