FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install dotenv
COPY . .
EXPOSE ${PORT}
CMD ["node", "index.js"]
