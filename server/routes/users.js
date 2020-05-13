const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

router
  .route("/")
  .post(UserController.create);

module.exports = router;
