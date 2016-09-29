(function() {

  var mod = angular.module("myApp.misc", []);

  mod.controller('miscController', function($scope, accessFactory) {
    this.userid = "";

    this.get_user = function () {

    var  packet =  { params :  { 
                                link  : '/session/userid'
                              } };
    var self = this;
    accessFactory.factory_access(packet).then(function(d) {
      var uid = d;
      var chopped = d.split('@');
      self.userid = chopped[0];
    });

    };

    this.get_user();



  });

})();
