FROM node:20

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm ci

RUN mkdir -p /usr/src/app/database && chown -R node:node /usr/src/app/database

COPY . .
USER node

CMD ["npm", "start"]
