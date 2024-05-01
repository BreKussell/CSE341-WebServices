// Import and configure environment variables
require('dotenv').config();

// Import MongoClient to connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let database;

// Initialize the database connection
const initDb = (callback) => {
    if(database) {
        console.log('Db is already initialized!');  // Log if database is already initialized
        return callback(null, database);            // Return the existing database instance
    }
    MongoClient.connect(process.env.MONGODB_URL)    // Connect to MongoDB using the URL from environment variables
    .then((client) => {
        database = client;                          // Store the database connection globally
        callback(null, database);                   // Execute callback with the database instance
    })
    .catch((err) => {
        callback(err);                              // Handle any errors during connection
    });
};

// Get the initialized database instance
const getDatabase = () => {
    if(!database) {
        throw Error('Database not initialized')     // Throw error if database is not initialized yet
    }
    return database;                                // Return the database instance
};

// Export the functions to be used in other parts of the application
module.exports = {
    initDb,
    getDatabase
};
