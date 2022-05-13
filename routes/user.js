const router = require("express").Router();
const userController = require("../controllers/user");


// Add new user to the database
router.post("/api/signUp", userController.signUpController);

// User login
router.post("/api/login", userController.loginController);

module.exports = router;



