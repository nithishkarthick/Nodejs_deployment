# Use MySQL official image
FROM mysql:8.0

# Set environment variables
ENV DB_PASSWORD=root
ENV DB_NAME=blood_donation_app

# Copy schema and init script
COPY schema.sql /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
