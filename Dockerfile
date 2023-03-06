FROM node:alpine

WORKDIR /usr/app

USER root

## Remove root tagged files from old version of npm
## Upgrade npm and replace UBI version 8.3.1
RUN npm cache clean –force \ 
  && rm -fR /opt/app-root/src/.npm \
  && npm install -g npm@8.13.2 \ 
  && rm -rf /usr/lib/node_modules \
  && microdnf update \
  && microdnf update libksba \
  && microdnf upgrade nodejs-full-i18n \
  && microdnf upgrade nodejs-docs \
  && microdnf upgrade nodejs \
  && microdnf upgrade xz-libs \
  && microdnf remove nodejs-nodemon \
  && microdnf clean all \
  && npm uninstall nodemon
COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD ["npm", "run", "start"]
