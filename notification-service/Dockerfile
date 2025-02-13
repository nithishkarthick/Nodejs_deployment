# Use node 18 Alpine image as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install mysql-client using apk
RUN apk update && apk add --no-cache mysql-client

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application files
COPY . .

# Expose the port your service is running on
EXPOSE 6000

# Command to run your application
CMD ["sh", "-c", "until mysql ping -h mysql --silent; do echo 'Waiting for MySQL...'; sleep 5; done; ./start-service.sh"]
