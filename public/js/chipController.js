(function() {

  var mod = angular.module("myApp.chip", []);

  mod.controller('chipController', function($scope, $routeParams, accessFactory, $location) {

    this.chip_name = $routeParams.id; 
    this.chip_type = $routeParams.ctype; 

    this.currentPage  = 1; // Initial value : current page

    this.maxSize      = 3; // Initial value : pagination max size 
                           // (static - bottom selection)

    this.entryLimit   = 10; // Initial value : Rows to show 
                           // (set by user, not data dependent)

    this.length       = 20; // Initial value : max rows for data table

    this.query        = "";
    this.orderByField = 'block';
    this.reverseSort  = false;

    //this.tag_opts = ['trial1', 'trial2', 'test'];
    this.selected_tag = 'none';
    this.edit_tag = false; 
    this.tag_active = false; 

    this.save_tag = function (element) {
      if (element) {
        for (var i = 0; i < this.tag_opts.length; i++) {
          if (this.tag_opts[i] === element) {
            return;
          }
        }
        this.tag_opts.push(element); 

      }

    };


    this.save_tag_to_db = function (element) {
        var update = { params :  { 
                                 tags    : this.tag_opts, 
                                 id      : this.chip_id,
                                 link    : '/db/chip_set_tags'
                               } };
        accessFactory.factory_access(update);
    };


    this.go = function () {
      var loc = '/chip/'+this.chip_type+'/'+this.chip_name;
      $location.path(loc);
    };

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
                                chip  : this.chip_name,
                                link  : '/db/chip_skip_limit'
                              } };

    var self = this;
    accessFactory.factory_access(rdata).then(function(d) {
      var local_info = [];
      d.forEach(function(entry) {
	var info = { name : entry.name, owners : entry.owner, id : entry._id };
        local_info.push(info);
      });
      self.data = local_info;

    });

    var  count =  { params :  { 
                                query : this.query, 
                                chip  : this.chip_name,
                                link  : '/db/chip_skip_limit_count'
                              } };

    accessFactory.factory_access(count).then(function(d) {
      self.length = d;
    });


    var  tags =  { params :  { 
                                chip  : this.chip_name,
                                link  : '/db/chip_get_tags'
                              } };

    var self = this;
    accessFactory.factory_access(tags).then(function(d) {
      self.tag_opts = d[0].tags;
      self.chip_id  = d[0]._id;
    });




    };

    this.submit = function(id, owners) {
      var update = { params :  { 
                                 id      : id, 
                                 owners  : owners, 
                                 link    : '/db/chip_update_owners'
                               } };
      accessFactory.factory_access(update);
    };

  });

})();
