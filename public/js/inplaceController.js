(function() {

  var mod = angular.module("myApp.inplace", []);

  mod.directive('editInPlace', function () {
      return {
          restrict: 'E',
          scope: {
              obj: '=',
              value: '=',
              id: '=',
          },
          templateUrl: 'inplace/inplace.html',
  
          link: function($scope, element, attrs) {
            $scope.Expand = function(e) {
               var element = typeof e === 'object' ? e.target : document.getElementById(e);
               var scrollHeight = element.scrollHeight;
               element.style.height =  scrollHeight + "px";
            };
          },
      };
  });


  mod.directive('editInPlaceTag', function () {
      return {
          restrict: 'E',
          scope: {
              obj: '=',
              value: '=',
              id: '=',
          },
          templateUrl: 'inplace/inplace_tag.html',

          link: function($scope, element, attrs) {
            $scope.check_and_push = function(data, value) {
               if (data) {
                 for (var i = 0; i < value.length; i++) {
                   if (value[i] === data) {
                     return;
                   }
                 }
                 value.push(data); 
               }

            };
          },
      };
  });

})();
