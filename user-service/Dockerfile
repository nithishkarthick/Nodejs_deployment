# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install the dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /app/wait-for-it.sh

# Ensure the script is executable inside the container
RUN chmod +x /app/wait-for-it.sh

# Set the entrypoint to wait for MySQL to be ready before starting the app
ENTRYPOINT ["/app/wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

# Copy the rest of the application files
COPY . .

# Expose the service on port 4000
EXPOSE 4000

# Default command to start the app
CMD ["node", "index.js"]
