var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

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
  });
});

app.put('/addexercise', function(req, res) {
  var object = req.body; //update to correct data form
  items.addExercise(object, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Exercise added to database.');
    }
  });
});

app.put('./deleteexercise', function(req, res) {
  var name = req.body;
  console.log('name inside delete express server: ', name);
  items.deleteExercise(name, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Exercise deleted successfully.');
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

