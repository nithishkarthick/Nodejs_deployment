# Use official Nginx image
FROM nginx:latest

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend files to Nginx's HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
