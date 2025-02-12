const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'blood_donation_db',
};

// 🔹 Function to wait for MySQL before proceeding
let connection;
function connectToDatabase() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('❌ MySQL connection failed:', err.message);
      setTimeout(connectToDatabase, 5000); // Retry in 5 sec
    } else {
      console.log('✅ Database connected successfully!');
    }
  });

  connection.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase();
    }
  });
}

connectToDatabase();

app.get('/test-endpoint', (req, res) => {
  res.status(200).json({ message: 'User Service is ready!' });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));

module.exports = connection;
