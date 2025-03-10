const express = require('express');
const authController = require('../controllers/authController'); // Ensure correct path
const router = express.Router();
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
module.exports = router;