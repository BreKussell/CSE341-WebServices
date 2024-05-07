// Import the swagger-autogen module
const swaggerAutogen = require ('swagger-autogen')();

// Define documentation information
const doc = {
    info: {
        title: 'Users Api',           // Title of the API
        description: 'Users Api'      // Description of the API
    },
    host: 'localhost:3001',          // Host and port where the API is served
    schemes: ['https', 'http']       // Supported protocols
};

// Specify the output file for the generated documentation
const outputFile = './swagger.json';

// List of files where endpoints are defined
const endpointsFiles = ['./routes/index'];

// Generate swagger.json documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
