const router = require("express").Router();
const loginController = require("../controllers/loginController");

//login
router.post("/login", loginController.postLogin);

//Register
router.post("/register", loginController.postRegister);

module.exports = router;
