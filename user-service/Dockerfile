# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install mysql-client using apk
RUN apk update && apk add --no-cache mysql-client

RUN apk add --no-cache bash

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Make sure the script is executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Install dependencies
RUN npm install

RUN npm install dotenv

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 4001

# Start the application using the wait-for-it script
CMD ["sh", "-c", "until mysql ping -h mysql --silent; do echo 'Waiting for MySQL...'; sleep 5; done; ./start-service.sh", "mysql:3306", "--", "node", "index.js"]