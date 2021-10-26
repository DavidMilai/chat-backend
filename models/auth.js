const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    clientCode: String,
    userID: String,
  });

const Auth = mongoose.model("auths", authSchema);
module.exports = Auth;
