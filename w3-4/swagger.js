const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'This is a simple CRUD API for managing users.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        User: {
            username: "johndoe",
            password: "s3cr3tp4ss"
        },
        UserResponse: {
            status: "Good",
            message: "User successfully created."
        },
        ErrorResponse: {
            status: "error",
            error: "Description of the error"
        }
    },
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header', // can be "header", "query" or "cookie"
            name: 'Authorization', // name of the header, query parameter or cookie
            description: "Basic Authorization header."
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
