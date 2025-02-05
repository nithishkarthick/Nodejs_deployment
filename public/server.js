const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (e.g., index.html)

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'blood_donation_app',  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API to fetch all donors
app.get('/api/donors', (req, res) => {
  const query = 'SELECT * FROM donors';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching donor list', error: err });
    }
    res.json(results);
  });
});

// Add new donor (POST request)
app.post('/api/donors', (req, res) => {
  const { name, age, gender, phone, dob, blood_group, location } = req.body;

  // Check if all required fields are provided
  if (!name || !age || !phone || !dob || !blood_group || !location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Received donor data:', { name, age, gender, phone, dob, blood_group, location });

  const query = `
    INSERT INTO donors (name, age, gender, phone, dob, blood_group, location) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query with the provided data
  db.query(query, [name, age, gender, phone, dob, blood_group, location], (err, results) => {
    if (err) {
      console.error('Error inserting donor:', err);
      return res.status(500).json({ message: 'Error adding new donor', error: err });
    }
    res.status(201).json({ message: 'Donor added successfully', donorId: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
