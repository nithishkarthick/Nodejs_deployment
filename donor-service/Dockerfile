# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

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
EXPOSE 5001

# Start the application using the wait-for-it script
CMD ["wait-for-it.sh", "mysql:3306", "--", "node", "index.js"]
