var express = require("express");
var exphbs  = require('express-handlebars');
var path = require('path');
var hello = require('./../controllers/hello');

var app = express();

// Define the port to run on
app.set('port', 80);

// Setup view engine
app.set('views', __dirname + '/../views/');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/../views/layouts/'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
  res.render('home', {
    title: 'Home'
  });
});

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