

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydatabase";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydatabase");
    var myobj = { users: 
        [{
         // id: 1,
          name: "Maria",
          email: "maria@gmail.com",
          phone: "0723445112"
        },
        {
          //id: 2,
          name: "Ioana",
          email: "ioana@gmail.com",
          phone: "0723115112"
        }
      ],
     
      date: new Date("2019-08-03"), 
      messages: 
        [{
         // id: 5,
          date:new Date("2020-06-23"),
          sender: "Maria",
          receiver: "Ioana",
          message_content: "Hey"
        }]
       };
    dbo.collection("messages").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    
  });