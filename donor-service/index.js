require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL (Donor Service)');
});

// Donor registration route
app.post('/donate', (req, res) => {
    const { name, age, gender, phone, dob, bloodGroup, location } = req.body;

    if (!name || !age || !gender || !phone || !dob || !bloodGroup || !location) {
        return res.status(400).send('All fields are required.');
    }

    db.query(
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

    db.query(
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
    db.query('SELECT * FROM donors', (err, result) => {
        if (err) return res.status(500).send('Error fetching donors');
        res.json(result);
    });
});

// Start the server
app.listen(process.env.PORT, () => console.log(`Donor Service running on port ${process.env.PORT}`));
