FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_BACKEND_URL="http://lights-backend:3001"

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
