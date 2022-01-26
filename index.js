const express = require("express");
const colors = require('colors');
const dotenv = require("dotenv");

const connectDB = require("./db.config");
const routes = require("./routes/routes");

const app = express()

// Load config
dotenv.config({ path: '.env' })

// Load handlers
app.use(express.json());

// Connecting routes
app.use("/api", routes);

// Connect to DB
connectDB();


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan))
