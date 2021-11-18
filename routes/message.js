const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");
// const authenticate = require("../middleware/authentication");

// router.get("/saveMessage", authenticate, UserController.index);
router.post("/sendMessage",  MessageController.saveMessage);
router.get("/getMessageID", MessageController.getMessages);

module.exports = router;
