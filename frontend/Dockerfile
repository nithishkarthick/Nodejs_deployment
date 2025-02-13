# Build the frontend (for React, Vue, or any other SPA framework)
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build  # Assuming `build` is the command to build your frontend

# Serve the built files with Nginx
FROM nginx:latest

# Copy the Nginx config file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the first stage into the Nginx default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
