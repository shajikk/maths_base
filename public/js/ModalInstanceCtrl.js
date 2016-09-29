(function() {

  var mod = angular.module("myApp.modal", []);

  mod.controller('ModalInstanceCtrl', function($scope, $modalInstance, msg) {

     this.msg = msg;
     
     this.ok = function () {
       $modalInstance.close();
     };
     
     this.cancel = function () {
       $modalInstance.dismiss('cancel');
     };

  });

})();
