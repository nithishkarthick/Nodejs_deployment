-- Ensure the database exists (This should already be handled by MySQL via MYSQL_DATABASE in docker-compose)
CREATE DATABASE IF NOT EXISTS blood_donation_app;

-- Use the database
USE blood_donation_app;

-- Call schema.sql directly (No SOURCE needed)
-- The schema.sql file will be automatically executed by MySQL
