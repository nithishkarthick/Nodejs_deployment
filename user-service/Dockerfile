# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy wait-for-it.sh script into the container
COPY wait-for-it.sh /app/wait-for-it.sh

# Ensure the script is executable
RUN chmod +x /app/wait-for-it.sh

# Copy the rest of the app
COPY . .

# Expose the port
EXPOSE 4000

# Start the application by first waiting for MySQL to be ready
ENTRYPOINT ["/app/wait-for-it.sh", "mysql:3306", "--", "npm", "start"]
