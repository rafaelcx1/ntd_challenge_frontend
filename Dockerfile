FROM node:16-alpine as build-stage
WORKDIR /app
COPY package.json /app/
RUN npm config set legacy-peer-deps true
RUN npm install --force
COPY ./ /app/
RUN npm run build:dev

FROM nginx:1.21.0-alpine
EXPOSE 7000
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf