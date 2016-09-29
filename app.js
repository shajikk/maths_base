var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var app = express();

app.use(bodyParser.json());

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);

  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log("Server @ http://%s:%s", add, server.address().port);
  });

});

// http://192.168.0.191:3000/lesson0/run?shajik=122

var question = 0;

var Chance = require('chance');
var chance = new Chance();

app.post('/result', function (req, res, next) {
  console.log(req.body);
  next();
});

app.get('/reset0/:state', function (req, res, next) {
  if (req.params['state'] == 'reset') {
    question = 1
    res.send("RESET");
    next();
  } 
});
app.get('/lesson0/:state', function (req, res, next) {


  var result = {};

  result.op  = chance.weighted([ 'mul', 'div', 'round', 'add', 'sub'], 
			       [  100,   100,   100,      25,   25]);

  if (req.params['state'] == 'run') {
    question = question + 1;
  } 

  if (result.op == 'add') {  
    result.v1  = chance.integer({min: 100, max: 999});
    result.v2  = chance.integer({min: 100, max: 999});
    result.ans = result.v1 + result.v2;
  }

  if (result.op == 'sub') {  
    var a  = chance.integer({min: 100, max: 999});
    var b  = chance.integer({min: 100, max: 999});
    if (a > b) {
      result.v1 = a;
      result.v2 = b;
    }
    if (a < b) {
      result.v1 = b;
      result.v2 = a;
    }
    result.ans = result.v1 - result.v2;
  }

  if (result.op == 'mul' || result.op == 'div') {  

    result.v1 = chance.weighted([ 1, 2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12], 
          		     [ 5, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]);
    
    result.v2 = chance.weighted([ 1, 2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12], 
          		     [ 5, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]);
    
    result.ans = result.v1 * result.v2;
    
  }

  if (result.op == 'round') {  

    var sel  = chance.weighted([ 'a',  'b', 'c', 'd', 'e'], 
			         [ 50,  100, 100, 100, 100]);

    if (sel == 'a') {
      result.v1  = chance.integer({min: 10, max: 100});
      result.v2  = 10;
    }

    if (sel == 'b') {
      result.v1  = chance.integer({min: 100, max: 1000});
      result.v2  = chance.weighted([ 10,  100], 
			           [ 100, 100]);
    }

    if (sel == 'c') {
      result.v1  = chance.integer({min: 1000, max: 10000});
      result.v2  = chance.weighted([ 100,  1000], 
			           [ 100,  100]);
    }

    if (sel == 'd') {
      result.v1  = chance.integer({min: 10000, max: 100000});
      result.v2  = chance.weighted([ 100,  1000, 10000], 
			           [ 100,  100,  100]);
    }

    if (sel == 'e') {
      result.v1  = chance.integer({min: 100000, max: 1000000});
      result.v2  = chance.weighted([ 1000, 10000, 100000], 
			           [ 100,  100,   100]);
    }

    var a  = Math.floor(result.v1/(result.v2)) * result.v2;
    var b = a % (result.v2 * 10);
    var c = b/result.v2;

    var bucket  = chance.weighted([ 'lt5',  'eq5', 'gt5'], 
		                  [ 100,    100,   100 ]);
    var calculated =  result.v1;
    if (bucket == 'lt5') {
      if (c > 4) {
        calculated = result.v1 - 5 * result.v2;
      }
    }

    if (bucket == 'eq5') {
      if (c > 5) {
        calculated = result.v1 - (c - 5) * result.v2;
      }
      if (c < 5) {
        calculated = result.v1 +  (5 - c) * result.v2;
      }
    }

    if (bucket == 'gt5') {
      if (c < 4) {
        calculated = result.v1 + 5 * result.v2;
      }
    }

    result.v1 = calculated;

    //console.log(JSON.stringify(result));
    result.ans = Math.round(result.v1/result.v2) * result.v2;
  }

  result.count = question;

  res.send(JSON.stringify(result));

});
