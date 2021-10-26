const User = require("../models/user");

const index = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

const show = (req, res, next) => {
  let id = req.body.userID;
  User.findById(id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

const store = (req, res, next) => {
  let user = new User({
    password: req.body.password,
    clientCode: req.body.clientCode,
    userID: req.body.userID,
    email: req.body.email,
  });
  user
    .save()
    .then((result) => {
      res.json({
        message: "Employee added succesfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Ann error occured",
      });
    });
};

module.exports = {index, show,store}
