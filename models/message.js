const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
    message: { type: String, require: true },
    userID: { type: String, require: true },
  });

const Message = mongoose.model("messages", message);
module.exports = Message;
