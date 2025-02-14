FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install cors
RUN npm install http-proxy-middleware
RUN npm install jsonwebtoken
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
