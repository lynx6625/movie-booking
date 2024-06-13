const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const cors = require("cors");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(cors()); //using cors and adding routes
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
