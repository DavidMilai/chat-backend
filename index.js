const express = require('express');
var http = require('http');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
var server = http.createServer(app);
var io = require('socket.io')(server);
app.use(express.json());
app.use(cors());

io.on("connection",(socket)=>{
    console.log("connected");
});

server.listen(port, "0.0.0.0", () => {
  console.log('server started');
});
