(function() {

  var mod = angular.module("myApp.run", []);

  mod.controller('runController', function($scope, $location, accessFactory, $routeParams, $http) {

    this.cur_count = $routeParams.count; 
    this.answer = "";
    var promise = accessFactory.get_data();
    var that = this;

    this.value1  = 0;
    this.value2  = 0;
    this.result  = 0;

    promise.then( function( d ) { 
      that.value1  = d.data.v1;
      that.value2  = d.data.v2;
      that.result  = d.data.ans;
      that.operation  = d.data.op;
      that.msg        = d.data.msg;
    });

    this.state   = 'right';


    this.Submit = function () {

      if (this.check_answer()) {

        if (accessFactory.number !=  accessFactory.current_try) {
          accessFactory.inc_current_try();
          this.do_next();
        } else {
          this.do_end();
        }
  
      }

    };

    this.check_answer = function () {

      var status = 1;

      if (this.operation == 'mul') { // multiplication

        var val = { 
		    operation  :  this.operation, 
		    answer_got : this.answer, 
		    correct    : this.result, 
		    val1       : this.value1, 
		    val2       : this.value2, 
		    status     : "RIGHT",
	          };

        if (this.answer != this.result) {
          this.state = 'wrong';
	  val.status = "WRONG";
	  var audio = document.getElementById("audio1");
	  audio.play();
	  status = 0; 
        }
        $http.post("/result", JSON.stringify(val)).success(function(data, status) {
           alert("posted : " + data);
        });

      }


      if (this.operation == 'div') { // division

        var val = { 
		    operation  :  this.operation, 
		    answer_got : this.answer, 
		    correct    : this.value1, 
		    val1       : this.value1, 
		    val2       : this.result, 
		    status     : "RIGHT",
	          };

        if (this.answer != this.value1) {
          this.state = 'wrong';
	  val.status = "WRONG";
	  var audio = document.getElementById("audio1");
	  audio.play();
	  status = 0;
        }

        $http.post("/result", JSON.stringify(val)).success(function(data, status) {
           alert("posted : " + data);
        });

      }

      if (this.operation == 'round') { // division

        var val = { 
		    operation  : this.operation, 
		    answer_got : this.answer, 
		    correct    : this.result, 
		    number     : this.value1, 
		    rounded_to : this.value2, 
		    status     : "RIGHT",
	          };


        if (this.answer != this.result) {
          this.state = 'wrong';
	  val.status = "WRONG";
	  var audio = document.getElementById("audio1");
	  audio.play();
	  status = 0;
        }

        $http.post("/result", JSON.stringify(val)).success(function(data, status) {
           alert("posted : " + data);
        });

      }

      if (this.operation == 'sub' || this.operation == 'add') { // division

        var val = { 
		    operation  : this.operation, 
		    answer_got : this.answer, 
		    correct    : this.result, 
		    value1     : this.value1, 
		    value2     : this.value2, 
		    status     : "RIGHT",
	          };


        if (this.answer != this.result) {
          this.state = 'wrong';
	  val.status = "WRONG";
	  var audio = document.getElementById("audio1");
	  audio.play();
	  status = 0;
        }

        $http.post("/result", JSON.stringify(val)).success(function(data, status) {
           alert("posted : " + data);
        });

      }


      if (this.operation == 'tdm') { // division

        var val = { 
		    operation  : this.operation, 
		    answer_got : this.answer, 
		    correct    : this.result, 
		    value1     : this.value1, 
		    value2     : this.value2, 
		    msg        : this.msg, 
		    status     : "RIGHT",
	          };


        if (this.answer != this.result) {
          this.state = 'wrong';
	  val.status = "WRONG";
	  var audio = document.getElementById("audio1");
	  audio.play();
	  status = 0;
        }

        $http.post("/result", JSON.stringify(val)).success(function(data, status) {
           alert("posted : " + data);
        });

      }

      return status;

    };

    this.do_next = function () {
      var audio = document.getElementById("audio2");
      audio.play();
      var loc = '/run/' + accessFactory.current_try;
      $location.path(loc);
    };

    this.do_end = function () {
      var promise1 = accessFactory.get_reset();

      promise1.then( function( d ) { 
	//alert(JSON.stringify(d.data));
      });


      var audio = document.getElementById("audio2");
      audio.play();
      var loc = '/end/' + accessFactory.number;
      $location.path(loc);
    };



  });

})();
