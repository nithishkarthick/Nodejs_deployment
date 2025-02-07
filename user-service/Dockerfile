# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy wait-for-it.sh script and ensure it's executable
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Copy the rest of the application
COPY . .

# Expose the service on port 4000
EXPOSE 4000

# Use wait-for-it.sh to wait for MySQL to be ready, then start the application
ENTRYPOINT ["/app/wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

# Start the application
CMD ["node", "index.js"]
