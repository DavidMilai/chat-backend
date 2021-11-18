const Message = require("../models/message");


const getMessages = (req, res, next) => {
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

const saveMessage = (req, res, next) => {
  let message = new Message({
    userID: req.body.userID,
    message: req.body.email,
  });
  message
    .save()
    .then((result) => {
      console.log(result);
      res.json({
        message: "Message saved",
      });
    })
    .catch((err) => {
      res.json({
        message: "Ann error occured",
      });
    });
};

module.exports = { getMessages, saveMessage,  };
