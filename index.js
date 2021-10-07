const express = require("express");
var http = require("http");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const User = require("./models/user");
var server = http.createServer(app);
var io = require("socket.io")(server);
app.use(express.json());

const dburl =
  "mongodb+srv://admin:admin-17@cluster0.syilg.mongodb.net/chat_app?retryWrites=true&w=majority&ssl=true";
mongoose
  .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

var clients = {};

app.route("/check").get((req, res) => {
  return res.json("app is woking fine");
});

app.get("/users",(req, res) => {
  User.find().then((result)=>{
    res.send(result);
  }).catch((err)=>{
    console.log(err);
  })
});


app.get("/single-user",(req, res) => {
  User.findById("615eb06edc3f63b3c5155a90").then((result)=>{
    res.send(result);
  }).catch((err)=>{
    console.log(err);
  })
});



app.get("/user", (req, res) => {
  
  const user = new User({
    password: "123456",
    clientCode: "demo",
    userID: "001",
    email: "david@gmail.com"
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.listen(port, () => {
//   console.log("Listening...");
// });

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});

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