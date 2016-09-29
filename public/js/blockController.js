(function() {

  var mod = angular.module("myApp.block", []);

  mod.controller('blockController', function($scope, $routeParams, accessFactory) {


    this.chip_name  = $routeParams.id; 
    this.chip_type  = $routeParams.ctype; 
    this.block_name =  $routeParams.block; 

    this.currentPage  = 1; // Initial value : current page

    this.maxSize      = 3; // Initial value : pagination max size 
                           // (static - bottom selection)

    this.entryLimit   = 10; // Initial value : Rows to show 
                           // (set by user, not data dependent)

    this.length       = 20; // Initial value : max rows for data table

    this.query        = "";
    this.orderByField = 'date';
    this.reverseSort  = false;

    $scope.$watch(
  
      // First argument : watch these variables.
      angular.bind(this, function () {
         return (this.currentPage.toString()+this.entryLimit.toString()+this.query+this.reverseSort); // `this` IS the `this` above!!
      }),
  
      // Second argument : Do this when the variable changes.
      angular.bind(this, function () {
        this.Fetch();
      })
  
    );

    this.Fetch = function () {


    var entryLimit = parseInt(this.entryLimit, 10); // Int conversion
    var start = (this.currentPage-1)*entryLimit; 
    var srt = 1;
    if (this.reverseSort) {
      srt = -1;
    }

    var  rdata =  { params :  { 
                                skip  : start, 
                                limit : entryLimit, 
                                query : this.query, 
                                sort  : srt, 
                                tag   : this.chip_type, 
                                sort_type  : this.orderByField, 
                                chip  : this.chip_name,
                                block : this.block_name,
                                link  : '/db/block_skip_limit'
                              } };

    var self = this;
    accessFactory.factory_access(rdata).then(function(d) {
      var info = [];
      d.forEach(function(entry) {
        info.push({
                   id : entry._id, 
                   name : entry.name, 
                   date : entry.date, 
                   tag : entry.tag 
                 });
      });
      self.data = info;

    });

    var  count =  { params :  { 
                                query : this.query, 
                                chip  : this.chip_name,
                                block : this.block_name,
                                tag   : this.chip_type, 
                                link  : '/db/block_skip_limit_count'
                              } };

    accessFactory.factory_access(count).then(function(d) {
      self.length = d;
    });

    };

    this.submit = function(id, tag) {
      var update = { params :  { 
                                 id      : id, 
                                 tag     : tag, 
                                 link    : '/db/block_update_tag'
                               } };
      accessFactory.factory_access(update);
    };


  });

})();
