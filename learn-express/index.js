/*
const express = require("express")
const mongoose = require("mongoose") 
const routes = require("./routes")

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use("/api", routes)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
	*/
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require("cors");

const app = express();

app.use(
	cors({
		origin:["http://localhost:3000"],
		credentials:true,
	})
);

app.use(bodyParser.json());
const db = "mongodb://localhost:27017/mydatabase";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.listen(5000, () => console.log("Server Running"));

const messagesRouter = require("./routes/message");
app.use("/messages", messagesRouter);