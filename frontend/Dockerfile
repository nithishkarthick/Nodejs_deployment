# Use the official nginx image as the base image
FROM nginx:latest

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first (to leverage Docker's cache)
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY ./frontend /app

# Expose the port for the frontend
EXPOSE 80

# Run the frontend (assuming you're building with a command like 'npm run build')
CMD ["npm", "run", "build"]
