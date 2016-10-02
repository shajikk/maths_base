module.exports = function(app) {
  
  var question = 0;

  var Chance = require('chance');
  var chance = new Chance();
  
  // http://192.168.0.191:3000/lesson0/run?shajik=122
  
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

  
    result.op  = chance.weighted([ 'mul', 'div', 'round', 'add', 'sub', 'tdm'], 
  			         [  100,   100,   100,      25,   25,    50]);
  
    if (req.params['state'] == 'run') {
      question = question + 1;
    } 

    if (result.op == 'add') {  
      result = require('./addition.js')(result, chance);
    }
  
    if (result.op == 'sub') {  
      result = require('./substration.js')(result, chance);
    }
  
    if (result.op == 'mul' || result.op == 'div') {  
      result = require('./muldiv.js')(result, chance);
    }
  
    if (result.op == 'round') {  
      result = require('./round.js')(result, chance);
    }

    if (result.op == 'tdm') {  
      result = require('./two_digit_mul.js')(result, chance);
    }
  
    result.count = question;
  
    res.send(JSON.stringify(result));
  
  });
  
};
