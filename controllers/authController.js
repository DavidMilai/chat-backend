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

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  Auth.findOne({ $or: [{ email: email }, { password: password }] }).then(
    (auth) => {
      if (auth) {
        bcrypt.compare(password, auth.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: auth.email }, "sercertvalue", {
              expiresIn: "30d",
            });

            let refreshToken = jwt.sign({ name: auth.email }, "refreshToken", {
              expiresIn: "30d",
            });

            res.json({
              message: "Login successful",
              token,
              refreshToken,
              result: auth
            });
          } else {
            res.json({
              message: "Invalid email or password",
            });
          }
        });
      } else {
        res.json({
          message: "Invalid username or password",
        });
      }
    }
  );
};

const refreshToken = (res, req, next) => {
  const refreshToket = req.body.refreshToken;
  jwt.verify(refreshToken, "refreshToken", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
      });
    }
    else{
      let token = jwt.sign({name: decode.name},"sercertvalue",{expiresIn:"60d"})
      const refreshToket = req.body.refreshToken;
      res.status(200).json({
        message: "Token refreshed",
        token,
        refreshToken
      })

    }
  });
};

module.exports = { register, login, refreshToken };
