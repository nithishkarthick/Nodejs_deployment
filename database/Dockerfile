# Use MySQL official image
FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=blood_donation_db

# Copy schema and init script
COPY schema.sql /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
