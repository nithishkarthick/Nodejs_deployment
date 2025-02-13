FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN apt-get update && apt-get install -y mysql-client
RUN npm install --production

COPY . .

EXPOSE 6000

CMD ["node", "index.js"]
