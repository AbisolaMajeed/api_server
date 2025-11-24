const express = require("express");
const bookRoutes = require("./routes/book");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", bookRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Swagger docs available at http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});