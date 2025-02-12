const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const authRoutes = require('./auth');  // Assuming your auth routes are in the 'auth' file

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // For parsing application/json

// Create a database connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // MySQL service container name from Docker
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function waitForMySQL() {
  connection.connect(function (err) {
    if (err) {
      console.log('Waiting for MySQL...', err.message);
      setTimeout(waitForMySQL, 5000);  // Retry after 5 seconds
    } else {
      console.log('Database connected!');
      // Continue with the rest of your user service logic here
    }
  });
}

waitForMySQL();  // Start waiting for MySQL connection

// Set up routes
app.use('/auth', authRoutes);  // Assuming your authentication routes are here

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
