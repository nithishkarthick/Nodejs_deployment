# Use node 18 Alpine image as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install mysql-client using apk
RUN apk update && apk add --no-cache mysql-client

RUN apk add --no-cache bash


# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Make sure the script is executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Install dependencies
RUN npm install --production

# Copy the rest of your application files
COPY . .

# Expose the port your service is running on
EXPOSE 6000

# Command to run your application
CMD ["sh", "-c", "chmod +x /usr/local/bin/wait-for-it.sh && /usr/local/bin/wait-for-it.sh ...", "until mysql ping -h mysql --silent; do echo 'Waiting for MySQL...'; sleep 5; done; ./start-service.sh"]
