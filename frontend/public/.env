# Use official Nginx image from Docker Hub
FROM nginx:alpine

# Copy your frontend files to the appropriate directory in the Nginx container
COPY ./assets /usr/share/nginx/html/assets
COPY ./donor-list.html /usr/share/nginx/html/donor-list.html
COPY ./home.html /usr/share/nginx/html/home.html
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./login.html /usr/share/nginx/html/login.html
COPY ./signup.html /usr/share/nginx/html/signup.html

# Expose port 80 to access the web server
EXPOSE 80

# Nginx will automatically start and serve the files from /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
