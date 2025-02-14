FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN npm install
RUN npm install dotenv
COPY . .
EXPOSE ${PORT}
CMD ["node", "index.js"]
