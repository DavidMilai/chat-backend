const express = require("express");
var http = require("http");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const dburl =
  "mongodb+srv://admin:admin-17@cluster0.syilg.mongodb.net/chat_app?retryWrites=true&w=majority";
mongoose
  .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

var server = http.createServer(app);
var io = require("socket.io")(server);
app.use(express.json());

var clients = {};

io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "has logged in");

  socket.on("signin", (id) => {
    clients[id] = socket;
    console.log(clients);
  });

  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.sourceId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

app.route("/check").get((req, res) => {
  return res.json("app is woking fine");
})

app.route("/test").get((req, res) => {
  return res.json("app is woking fine");
})