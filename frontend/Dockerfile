FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Ensure proper permissions
RUN chown -R node:node /app

# Copy the rest of the application code into the container
COPY . .

# Set permissions on node_modules (in case of permission issues)
RUN chmod -R 777 /app/node_modules

# Build the app using npx to avoid permission issues
RUN npx react-scripts build

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
