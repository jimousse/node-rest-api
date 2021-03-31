const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userValidators = require('./validators/user');


router.put('/signup', userValidators, authController.signUp);
router.post('/login', authController.login);

module.exports = router;