FROM node:14.16.0-alpine3.13 as build
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . /app
RUN npm run build -- --configuration=stage

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist/shareit /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d && \
    rm -rf /app
COPY nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]