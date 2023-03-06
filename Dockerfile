# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm build

EXPOSE 8080
CMD ["npm", "start"]
