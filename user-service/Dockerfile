# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the service on port 4000
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
