const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();
const port = 3000;

// Middleware to parse JSON and URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static files (HTML, CSS, JS)
app.use(express.static('public'));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Replace with your MySQL password
    database: 'blood_donation_app',
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Donor registration route
app.post('/donate', (req, res) => {
    const { name, age, gender, phone, dob, bloodGroup, location } = req.body;

    // Basic validation
    if (!name || !age || !gender || !phone || !dob || !bloodGroup || !location) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO donors (name, age, gender, phone, dob, blood_group, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, age, gender, phone, dob, bloodGroup, location], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving donor information');
        }
        res.send('Donor registered successfully!');
    });
});

// Donor search route
app.post('/search-donors', (req, res) => {
    const { bloodGroup, location } = req.body;

    let query = 'SELECT * FROM donors WHERE blood_group = ? AND location = ?';
    db.query(query, [bloodGroup, location], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error searching for donors');
        }
        res.json(result);
    });
});
// Route to get all registered donors
app.get('/donors', (req, res) => {
    const query = 'SELECT * FROM donors'; // Get all donors from the database
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching donors');
        }
        res.json(result); // Return the list of all donors as JSON
    });
});
// User registration route (with password hashing)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error registering user');
        }
        res.send('User registered successfully!');
    });
});

// POST route to handle login (using hashed passwords)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error checking user');
        }
        if (result.length === 0) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare the password with the hashed password in the database
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.json({ success: true });
        } else {
            return res.status(400).send('Invalid email or password.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
