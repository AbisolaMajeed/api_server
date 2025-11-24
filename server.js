const express = require("express");
const bookRoutes = require("./routes/book");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample route
app.use("/", bookRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});