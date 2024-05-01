// Load required modules
const express = require('express');               // Express framework for handling server logic
const bodyParser = require('body-parser');       // Middleware to parse the body of incoming requests
const mongoDB = require('./database/database.js') // Custom module to handle MongoDB database operations

// Define server configuration
const port = 3001;                               // Server port number
const host = 'localhost'                         // Server hostname
const app = express();                           // Create an instance of an Express application

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Uncomment to serve files from the 'public' directory
//app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.send("Hello");                           // Send a greeting message when visiting the home page
});

// Include routes defined in the 'routes' folder
app.use('/', require('./routes'))

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow any domain to access your API
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();  // Pass control to the next handler
});

// Initialize database and start server
mongoDB.initDb((err) => {
    if (err) {
        console.log(err);  // Log any error during database initialization
    } else {
        app.listen(port, () => {  // Start the server if the database initializes successfully
            console.log(`Database and app listening on ${host}:${port}`)
        })
    }
})
