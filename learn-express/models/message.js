const mongoose = require("mongoose");

/*const messageschema = mongoose.Schema({
    //id: ObjectID,
    users: [
      {
        id: Number,
        name: String,
        email: String,
        phone: String
      }
    ],
    date: Date, 
    messages: [
      {
        id: Number,
        date: Date,
        sender: String,
        receiver: String,
        message_content: String
      }
    ]
});

module.exports = mongoose.model("Post", messageschema);
//const Message = mongoose.model('Message',messageschema);
*/

const Schema = mongoose.Schema;

const messageschema = new Schema({
  //id: ObjectID,
  users: [
    {
      id: Number,
      name: String,
      email: String,
      phone: String
    }
  ],
  date: Date, 
  messages: [
    {
      id: Number,
      date: Date,
      sender: String,
      receiver: String,
      message_content: String
    }
  ]
});

module.exports = mongoose.model("message", messageschema);