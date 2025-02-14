const express = require('express');
const path = require('path');
const db = require('./db.js'); // MySQL Connection
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Donor registration route
app.post('/donate', async (req, res) => {
    const { name, age, gender, phone, dob, bloodGroup, location } = req.body;

    if (!name || !age || !gender || !phone || !dob || !bloodGroup || !location) {
        return res.status(400).send('All fields are required.');
    }

    try {
        await db.query(
            'INSERT INTO donors (name, age, gender, phone, dob, blood_group, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, age, gender, phone, dob, bloodGroup, location]
        );
        res.send('Donor registered successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving donor information');
    }
});

// Search donors
app.post('/search-donors', async (req, res) => {
    const { bloodGroup, location } = req.body;

    try {
        const [result] = await db.query(
            'SELECT * FROM donors WHERE blood_group = ? AND location = ?',
            [bloodGroup, location]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching for donors');
    }
});

// Get all donors
app.get('/donors', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donors');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database query error');
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Donor Service running on port ${PORT}`));
