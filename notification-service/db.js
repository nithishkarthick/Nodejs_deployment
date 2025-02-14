const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql',  // Use 'localhost' for local MySQL installation
  user: 'root',
  password: 'yourpassword',
  database: 'your_database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
});
