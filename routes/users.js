const express = require('express');
const router = express.Router();

// Import the controller
const usersController = require('../controllers/users');

// Route to get all users
router.get('/', usersController.getAllUsers);

// Route to create a new user
router.post('/', usersController.createUser);

module.exports = router;



