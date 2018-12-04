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

var deleteExercise = function(name, callback) {
  Data.findOneAndDelete({"name": name}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

  /*
    db.collection.update(
        { "_id": ID, "playlists._id": "58"},
        { "$push": 
            {"playlists.$.musics": 
                {
                    "name": "test name",
                    "duration": "4.00"
                }
            }
        }
    )
  */

module.exports.selectAll = selectAll;
module.exports.singleDay = singleDay;
module.exports.addExercise = addExercise;
module.exports.Data = Data;