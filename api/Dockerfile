FROM node:latest
MAINTAINER Felipe Regino
COPY ./api/ /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE 3000