const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new Auth({
      email: req.body.email,
      password: hashedPass,
      clientCode: req.body.clientCode,
    });
    user
      .save()
      .then((result) => {
        console.log(result);
        res.json({
          message: "User added succesfully",
        });
      })
      .catch((err) => {
        res.json({
          message: "An error occured",
        });
      });
  });
};
module.exports = { register };
