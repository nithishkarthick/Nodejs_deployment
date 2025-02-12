const mysql = require('mysql');
require('dotenv').config();


// Create a database connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // MySQL service name from Docker
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to check the database connection
function checkDBConnection(req, res, next) {
  connection.connect(function(err) {
    if (err) {
      console.log('Database connection failed: ', err);
      return res.status(500).send('Database connection failed');
    } else {
      console.log('Database connected!');
      next();  // Move to the next middleware or route
    }
  });
}

module.exports = checkDBConnection;
