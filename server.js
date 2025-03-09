const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple API",
            version: "1.0.0",
            description: "A simple Express API with Swagger documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./server.js"], // Points to where API documentation is written
};

// Generate Swagger Documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a simple welcome message
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
app.get("/users", (req, res) => {
    res.json([{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }]);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
