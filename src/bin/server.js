var express = require("express");
var path = require('path');
var hello = require('./../controllers/hello');

var app = express();

// Define the port to run on
app.set('port', 80);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/hello', hello);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Running on port ' + port);
  process.send && process.send({
    process: 'server.js',
    state: 'listening'
  });
});