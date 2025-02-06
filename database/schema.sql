-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blood_donation_app;
USE blood_donation_app;

-- Users table (Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donors table
CREATE TABLE IF NOT EXISTS donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (email, password) VALUES
('admin@example.com', '$2a$10$w3m.H/BbTPtqk7/k6ONV1O5S5eXX0hvg9e6k3xLzOWrWPaA6D2e6K'); -- Hashed password example

INSERT INTO donors (name, age, gender, phone, dob, blood_group, location) VALUES
('John Doe', 28, 'Male', '1234567890', '1996-03-15', 'O+', 'New York'),
('Jane Smith', 32, 'Female', '0987654321', '1992-07-22', 'A-', 'Los Angeles');
