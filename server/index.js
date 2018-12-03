var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/data', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/daydata', function(req, res) {
  var day = Object.keys(req.query)[0];
  items.singleDay(day, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

