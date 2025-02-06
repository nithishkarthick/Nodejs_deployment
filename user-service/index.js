require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

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
    console.log('Connected to MySQL (User Service)');
});

// User registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Email and password required.');

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
        if (err) return res.status(500).send('Error registering user');
        res.send('User registered successfully!');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Error logging in');

        if (results.length === 0) return res.status(400).send('Invalid email or password');

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) return res.json({ success: true });
        return res.status(400).send('Invalid email or password');
    });
});

// Start the server
app.listen(process.env.PORT, () => console.log(`User Service running on port ${process.env.PORT}`));
