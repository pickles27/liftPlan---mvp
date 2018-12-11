var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/liftplan');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('mongoose connection error:', err);
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  day: String,
  occasion: String,
  workouts: Array
});

var Data = mongoose.model('Data', itemSchema);

var selectAll = function(callback) {
  Data.find({}, function(err, data) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

var singleDay = function(day, callback) {
  Data.find({day: day}, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

var addExercise = function(object, callback) {
  Data.findOneAndUpdate({day: object.day}, {
    "$push":
      {
        "workouts": object.data
      }
  }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

var deleteExercise = function(object, callback) {
  Data.update({"day": object.day}, {$pull: {"workouts": {"name": object.name}}}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.singleDay = singleDay;
module.exports.addExercise = addExercise;
module.exports.deleteExercise = deleteExercise;
module.exports.Data = Data;