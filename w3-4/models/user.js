const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], // Adding custom error messages
        unique: true, // Ensures usernames are unique in the database
        trim: true, // Removes whitespace from both ends of the string
        lowercase: true // Converts username to lowercase for consistency
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
{
    collection: 'users', // Explicitly specifying the collection name
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Create the model from the schema
const UserModel = mongoose.model('User', UserSchema); // 'User' is a more conventional name

// Correctly export the model
module.exports = UserModel; // Changed from 'module.export' to 'module.exports'
