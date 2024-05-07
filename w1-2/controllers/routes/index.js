// Import Express Router
const router = require('express').Router();

// Middleware to use Swagger for API documentation
router.use('/', require('./swagger'));

// Uncommented router method for root path to send a simple greeting message
// router.get('/', (req, res) => {res.send('Hello');});

// Route for the root path that sends a 'Hello' message when visited
router.get('/', (req, res) => {
    res.send('Hello');
});

// Route that forwards any requests to '/users' to the 'users' router
router.use('/users', require('./users'));

// Export the router so it can be used by other parts of the application
module.exports = router;
