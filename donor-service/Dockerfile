# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install mysql-client and bash using apk
RUN apk update && apk add --no-cache mysql-client bash

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install dotenv (if needed as a separate dependency)
RUN npm install dotenv

# Copy the rest of the application code into the container
COPY . .

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Explicitly set permissions for the script
RUN chmod 755 /usr/local/bin/wait-for-it.sh


# Expose the port the app will run on
EXPOSE 5001

# Start the application using the wait-for-it script
CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh mysql:3306 -- npm start"]
