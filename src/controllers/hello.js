var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('<!DOCTYPE html><html><body>Hello world!</body></html>');
});

router.get('/:name', function (req, res) {
  res.send('What is up ' + req.params.name);
});

module.exports = router;