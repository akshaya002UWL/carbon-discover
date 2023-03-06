FROM node:alpine

WORKDIR /usr/app

USER root

## Remove root tagged files from old version of npm
## Upgrade npm and replace UBI version 8.3.1
RUN npm cache clean –force 

COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD ["npm", "run", "start"]
