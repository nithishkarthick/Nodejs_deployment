-- Use the database
USE blood_donation_app;

-- Ensure tables exist
SOURCE /docker-entrypoint-initdb.d/schema.sql;