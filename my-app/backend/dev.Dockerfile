FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir -p /usr/src/app/database && chown -R node:node /usr/src/app/database
RUN npm install

COPY . .

# CMD ["npm", "run", "dev", "--", "--host"]
CMD ["sh", "-c", "mkdir -p /usr/src/app/database && chown -R node:node /usr/src/app/database && npm run dev -- --host"]
