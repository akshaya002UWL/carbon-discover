# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app .
RUN chmod -R 775 /var/cache/nginx /var/run /var/log/nginx
    
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
