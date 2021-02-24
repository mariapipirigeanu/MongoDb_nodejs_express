//Import the mongoose module
/*
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/mydatabase";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydatabase";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydatabase");
    var myobj = { users: 
        {
          id: 5,
          name: "Costi",
          email: "costi@gmail.com",
          phone: "0723115112"
        },
      
      date: new Date("2020-08-03"), 
      messages: 
        {
          id: 5,
          date:new Date("2020-06-23"),
          sender: "Alina",
          receiver: "Costi",
          message_content: "Ne vedem diseara?"
        }
       };
    dbo.collection("messages").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    
  });