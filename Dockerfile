FROM node:20

WORKDIR /var/www/web

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]