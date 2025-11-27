const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: { 
        openapi: "3.0.0",
        info: {
            title: "Books API",
            version: "1.0.0",
            description: "Simple CRUD API with Swagger documentation",
            contact: {
                name: "code with excellence",
                url: "codewithexcellence.com",
                email: "info@email.com"
            },
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
            {
                url: "v2"
            },
        ],
    },
    apis: ["./routes/*.js"], //Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;