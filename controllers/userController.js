// Import necessary modules and setup
const mongodb = require('../database/database');        // MongoDB connection module
const ObjectId = require('mongodb').ObjectId;           // MongoDB ObjectId function for handling IDs

// Retrieve all users
const getAll = async (req, res) => {
    //#swagger.tags['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');  // Set content type
            res.status(200).json(users);                       // Send users as JSON with a 200 OK status
    });
};

// Retrieve a single user by ID
const getSingle = async (req, res) => {
    //#swagger.tags['Users']
    const userId = new ObjectId(req.params.id);                 // Convert param ID to MongoDB ObjectId
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);                     // Send the first user found as JSON
    });
};

// Create a new user
const createUser = async (req, res) => {
    //#swagger.tags['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.acknowledged) {
        res.status(204).send();                                 // Send no content status on success
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the user.');
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    //#swagger.tags['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating this user.');
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    //#swagger.tags['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting this user.');
    }
};

// Export functions to make them available for router
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
