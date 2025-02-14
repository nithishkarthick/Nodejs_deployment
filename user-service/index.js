const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'blood_donation_db',
});

connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

app.get('/test-endpoint', (req, res) => {
  res.status(200).json({ message: 'User Service is ready!' });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));
