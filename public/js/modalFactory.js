(function() {

  var mod = angular.module("myApp.modFactory", []);

  mod.factory('modalFactory', function($uibModal) {
    return {
  
      factory_modal : function(msg) {

        var modalInstance = $uibModal.open({
          templateUrl: 'modal/modalContent.html',
          controller: 'ModalInstanceCtrl as mic',
          resolve: {
            msg: function () {
              return msg;
            }
          }
        });

      }

    }
  });

})();
