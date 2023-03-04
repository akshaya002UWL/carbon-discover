# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app .
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]