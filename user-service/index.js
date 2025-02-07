require('dotenv').config();
const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for better compatibility with promises
const bcrypt = require('bcryptjs');
const app = express();

// Use middleware to parse incoming JSON data
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql',  // Use 'mysql' as the service name defined in docker-compose
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'blood_donation_app',
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        setTimeout(connectToDatabase, 4000);
    }
    console.log('Connected to MySQL database');

  return connection;
});

// User registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Email and password required.');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
        if (err) return res.status(500).send('Error registering user');
        res.send('User registered successfully!');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Error logging in');

        if (results.length === 0) return res.status(400).send('Invalid email or password');

        const user = results[0];
        
        // Compare the password with the hashed password stored in the database
        const match = await bcrypt.compare(password, user.password);

        if (match) return res.json({ success: true });
        return res.status(400).send('Invalid email or password');
    });
});

// Start the server
app.listen(process.env.PORT, () => console.log(`User Service running on port ${process.env.PORT}`));
