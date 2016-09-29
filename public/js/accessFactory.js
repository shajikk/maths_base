(function() {

  var mod = angular.module("myApp.accFactory", []);

  mod.factory('accessFactory', ['$http', function($http) {

    var mainFactory = {};

    mainFactory.revisit     = [];
    mainFactory.number      = 60;
    mainFactory.current_try = 1;

    mainFactory.get_reset = function () {
      var promise = $http.get('/reset0/reset').success(function(d){
        return d;   
      });
      return promise;
    };

    mainFactory.get_data = function () {
      var promise = $http.get('/lesson0/run').success(function(d){
        return d;   
      });
      return promise;
    };


    mainFactory.getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    mainFactory.inc_current_try = function() {
      mainFactory.current_try++;
    };

    return mainFactory;

  }]);

})();
