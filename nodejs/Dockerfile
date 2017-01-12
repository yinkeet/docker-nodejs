FROM node:slim

RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY package.json /usr/src/
RUN npm install

# use gulp-cli for development
RUN npm install --global gulp-cli

COPY gulpfile.js /usr/src/

ARG env
ENV ENV=$env

CMD ["gulp"]