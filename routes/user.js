const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/users", UserController.index);
router.post("/register", UserController.store);
router.post("/getByID", UserController.show);

module.exports = router;