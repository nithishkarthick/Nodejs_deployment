# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy wait-for-it.sh script
COPY wait-for-it.sh /app/wait-for-it.sh

# Ensure the script is executable
RUN chmod +x /app/wait-for-it.sh

# Set the entrypoint
ENTRYPOINT ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

# Copy the rest of the application
COPY . .

# Expose the service on port 4000
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
