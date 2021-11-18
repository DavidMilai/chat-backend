const express = require("express");
var http = require("http");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const User = require("./models/user");
var server = http.createServer(app);
var io = require("socket.io")(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routes = require("./routes");
const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const MessageRoute = require("./routes/message");



app.use("/routes", routes);
app.use("/api", UserRoute);
app.use("/auth", AuthRoute);
app.use("/messages", MessageRoute);


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
