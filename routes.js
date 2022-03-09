const express = require('express');
const router = express.Router();
const userController = require('./controller');
const auth = require('./middleware/auth')

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/", auth, userController.homePage);

module.exports = router;