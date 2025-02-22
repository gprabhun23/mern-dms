const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Document Management System API',
    description: 'API documentation for the MERN Document Management System',
    version: '1.0.0',
  },
  servers: [
    {
      url: process.env.API_BASE_URL || 'http://localhost:5000', // Dynamic Server URL
      description: 'Development Server',
    },
  ],
};

const outputFile = './config/swagger-output.json'; // Auto-generated file
const routes = ['./server.js']; // Scan routes from the main server file

swaggerAutogen(outputFile, routes, doc);
