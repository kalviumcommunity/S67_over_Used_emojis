const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');  // Assuming this is your database connection file
const router = require('./Routes'); // Assuming this contains your routes

const app = express();
require('dotenv').config();
app.use(express.json())

const port = 8081;
const url = process.env.db_url;

app.use('/', router);

// Start the server
app.listen(port, async () => {
  try {
    // Attempt to connect to the database
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);  // Exit the process with a non-zero status code if DB connection fails
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

