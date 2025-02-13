# Step 1: Build the frontend app using Node.js
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY /app

# Build the app (assuming you're using a command like 'npm run build')
RUN npm run build

# Step 2: Serve the built app using NGINX
FROM nginx:latest

# Set the working directory to the location where nginx serves files
WORKDIR /usr/share/nginx/html

# Remove the default nginx index page
RUN rm -rf ./*

# Copy the build files from the 'build' stage to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx will serve on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
