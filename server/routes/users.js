const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");
const authenticate = require("../middleware/auth");

router
  .route("/")
  .all(authenticate)
  .post(UsersController.create)
  .get(UsersController.read);

module.exports = router;
