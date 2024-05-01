// Import Express and create a router
const express = require('express');
const router = express.Router();

// Import the user controller to handle requests
const userController = require("../controllers/userController");

// Define routes for user-related requests

// GET requests to '/' to retrieve all users
router.get('/', userController.getAll);

// GET requests to '/:id' to retrieve a single user by ID
router.get('/:id', userController.getSingle);

// POST requests to '/' to create a new user
router.post('/', userController.createUser);

// PUT requests to '/:id' to update an existing user
router.put('/:id', userController.updateUser);

// DELETE requests to '/:id' to delete an existing user
router.delete('/:id', userController.deleteUser);

// Export the router so it can be included and used by the main application
module.exports = router;
