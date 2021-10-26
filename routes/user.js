const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authenticate = require("../middleware/authentication");

router.get("/users", authenticate, UserController.index);
router.post("/register", UserController.store);
router.post("/getByID", UserController.show);

module.exports = router;
