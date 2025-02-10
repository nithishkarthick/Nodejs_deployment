require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');  // Use mysql2 for better compatibility with promises
const bcrypt = require('bcryptjs');
const app = express();
const retry = require('retry');

// Use middleware to parse incoming JSON data
app.use(express.json());

// Create a function to handle MySQL connection retries
const connectToDatabase = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'mysql',  // Use 'mysql' as the service name defined in docker-compose
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'blood_donation_app',
    });

    const operation = retry.operation({ retries: 10, factor: 2, minTimeout: 1000 });

    operation.attempt((currentAttempt) => {
        connection.connect((err) => {
            if (err) {
                console.log(`Attempt ${currentAttempt} failed: ${err.message}`);
                if (operation.retry(err)) {
                    return;
                }
                console.log("Couldn't connect to MySQL after several attempts.");
                process.exit(1);  // Exit the process if the connection cannot be established after several attempts
            } else {
                console.log("Connected to MySQL");
            }
        });
    });

    return connection;
};

// Create MySQL connection with retry logic
const connection = connectToDatabase();

// User registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Email and password required.');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    connection.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)', 
        [email, hashedPassword]
    )
    .then(() => {
        res.send('User registered successfully!');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error registering user');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    connection.execute('SELECT * FROM users WHERE email = ?', [email])
    .then(async ([rows]) => {
        if (rows.length === 0) return res.status(400).send('Invalid email or password');

        const user = rows[0];
        
        // Compare the password with the hashed password stored in the database
        const match = await bcrypt.compare(password, user.password);

        if (match) return res.json({ success: true });
        return res.status(400).send('Invalid email or password');
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).send('Error logging in');
    });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`User Service running on port ${port}`));
