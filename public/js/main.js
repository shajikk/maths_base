(function() {

  'use strict';

  var app = angular.module('myApp', [
                                      'ui.bootstrap', 
                                      'ngRoute', 
                                      'myApp.root', 
                                      'myApp.accFactory',
                                      'myApp.run', 
                                      'myApp.end', 
                                      //'myApp.modal',
                                      //'myApp.modFactory',
				      /*
                                      'myApp.chip', 
                                      'myApp.block', 
                                      'myApp.table',
                                      'myApp.misc',
                                      'myApp.tag',
                                      'myApp.inplace',
				      */
                                    ]);

  app.config(function($routeProvider){
  
    /*
    $routeProvider.when('/chip/:ctype/:id/:block', {
      templateUrl: './templates/block.html',
      controller: 'blockController'
    });
    */
  
    $routeProvider.when('/run/:count', {
      templateUrl: './templates/run.html',
      //controller: 'runController'
    });

    $routeProvider.when('/end/:count', {
      templateUrl: './templates/end.html',
      //controller: 'endController'
    });
  
    /*
    $routeProvider.when('/chip/:ctype/:id', {
      templateUrl: './templates/chip.html',
      controller: 'chipController'
    });
    */

    $routeProvider.when("/", {
      templateUrl: './templates/root.html',
      //controller: 'rootController'
    });
  
    $routeProvider.otherwise({ redirectTo: '/' });
  
  });

})();
