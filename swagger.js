const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Books API",
            version: "1.0.0",
            description: "Simple CRUD API with Swagger documentation"
        },
        servers: [
            {
                url: "v1"
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