FROM node:latest
MAINTAINER Felipe Regino
COPY ./client/ /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE 8000