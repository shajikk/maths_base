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

require('./routes')(app);

