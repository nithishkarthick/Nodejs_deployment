require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const retry = require('retry');

// Create an instance of express
const app = express();

// Use middleware to parse incoming JSON data
app.use(express.json());

// Serve static files (CSS, JS, etc.) from the 'frontend/public' folder
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

const operation = retry.operation({
    retries: 10, // retry up to 10 times
    factor: 2,   // exponential backoff
    minTimeout: 1000, // minimum time between retries (1 second)
  });
  
 operation.attempt((currentAttempt) => {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || 'mysql', // use the name of the MySQL container or service
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'blood_donation_app',
    });
  

connection.connect((err) => {
        if (err) {
          console.log(`Attempt ${currentAttempt} failed: ${err.message}`);
          if (operation.retry(err)) {
            return;
          }
          console.log("Couldn't connect to MySQL after several attempts.");
          process.exit(1);
        } else {
          console.log('Connected to MySQL');
        }
      });
    });
connectWithRetry();
// Donor registration route
app.post('/donate', (req, res) => {
    const { name, age, gender, phone, dob, bloodGroup, location } = req.body;

    if (!name || !age || !gender || !phone || !dob || !bloodGroup || !location) {
        return res.status(400).send('All fields are required.');
    }

    connection.query(
        'INSERT INTO donors (name, age, gender, phone, dob, blood_group, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, age, gender, phone, dob, bloodGroup, location],
        (err) => {
            if (err) return res.status(500).send('Error saving donor information');
            res.send('Donor registered successfully!');
        }
    );
});

// Search donors
app.post('/search-donors', (req, res) => {
    const { bloodGroup, location } = req.body;

    connection.query(
        'SELECT * FROM donors WHERE blood_group = ? AND location = ?',
        [bloodGroup, location],
        (err, result) => {
            if (err) return res.status(500).send('Error searching for donors');
            res.json(result);
        }
    );
});

// Get all donors
app.get('/donors', (req, res) => {
    connection.query('SELECT * FROM donors', (err, result) => {
        if (err) return res.status(500).send('Error fetching donors');
        res.json(result);
    });
});

// Root route: Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Start the server
app.listen(process.env.PORT, () => console.log(`Donor Service running on port ${process.env.PORT}`));
