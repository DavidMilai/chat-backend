const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true },
  password: String,
  clientCode: String,
  userID: String,
  email: String
});

const User = mongoose.model("users", userSchema);
module.exports = User;
