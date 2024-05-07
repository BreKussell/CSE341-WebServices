// Import Express Router and Swagger-related packages
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');        // Middleware to serve the Swagger UI
const swaggerDocument = require('../swagger.json');     // Swagger API specification document

// Serve Swagger UI at '/api-docs'
router.use('/api-docs', swaggerUi.serve);               // Middleware to serve the files necessary for Swagger UI

// Set up Swagger UI using the API documentation defined in swagger.json
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Export the router to be used elsewhere in the application
module.exports = router;
