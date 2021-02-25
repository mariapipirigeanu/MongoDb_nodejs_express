const express = require("express");
const router = express.Router();
const Message = require("../models/message");

//post method
//http://localhost:5000/messages/add
router.post("/add", (req, res) => {
  //console.log(req.body);
  var newMessage = new Message();
  newMessage.users = req.body.users;
  newMessage.date = req.body.date;
  newMessage.messages = req.body.messages;

  newMessage
    .save()
    .then(() => res.json("Message Added..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get method
//http://localhost:5000/messages/
router.get("/", (req, res) => {
  console.log(Message);
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json("Error: " + err));
    
});

router.get("/get1", (req, res) => {

    Message.aggregate([
      {"$match": {_id:req.params.id}},
        {"$sort": {
          "messages.date": -1
        }
      },
      // {"$project":{
      //   "users":1,
      //   "date":1,
      //   "messages":1}

      // }
    ])
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json("Error: " + err));
    
});


//sortare descrescatoare in functie de date
//http://localhost:5000/messages/sorting
router.get("/sorting", (req, res) => {
  console.log(Message);
  Message.find()
    .then((messages) =>
    {messages.sort((left,right)=> (left.date > right.date ? -1: 1))
      res.json(messages)})
    
   
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
router.put('/update/:id',function (req,res,next) {
  console.log(req.body);
  Message.updateOne({_id: req.params.id},{$set:{date:req.body.date}})
  //Message.updateById(req.params.id,new Message(req.body))
 //Message.updateOne(req.params.id,new Message(req.body))
  .then((response)=>{
    console.log(req.body.messages);
    res.send(response);
  })
  .catch((err)=> {
    console.log(err)
  })
 
});
  

module.exports = router;