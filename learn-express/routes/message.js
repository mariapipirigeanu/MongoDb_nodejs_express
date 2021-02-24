const express = require("express");
const router = express.Router();
const Message = require("../models/message");

//post method
//http://localhost:5000/messages/add
router.post("/add", (req, res) => {
  const newMessage = new Message({
      //id: ObjectID,
  users: [
    {
      id: req.body.id,
      name: req.body.name,
      email:req.body.email ,
      phone: req.body.phone
    }
  ],
  date: req.body.date, 
  messages: [
    {
      id:  req.body.id,
      date:  req.body.date,
      sender:  req.body.sender,
      receiver:  req.body.receiver,
      message_content: req.body.message_content
    }
  ]
    
  });
  newMessage
    .save()
    .then(() => res.json("Message Added..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get method
//http://localhost:5000/messages/
router.get("/", (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json("Error: " + err));
});


//delete method
//http://localhost:5000/messages/delete/6035854890adc8698028ffc9
router.delete("/delete/:id", (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.json("Message Deleted..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//put method
router.post("/update/:id", (req, res) => {
  Message.findById(req.params.id)
    .then((message) => {
      //message.users.id=req.body.id;
      //message.users.name= req.body.name;
      //message.users.email=req.body.email;
      //message.users.phone= req.body.phone;
      
      message.date=req.body.date;
      //message.messages.id=req.body.id;
      //message.messages.date=req.body.date;
      //message.messages.sender=req.body.sender;
     // message.messages.receiver=req.body.receiver;
     // message.messages.message_content=req.body.message_content;
      
      message
        .save()
        .then(() => res.json("Message Updated..."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;