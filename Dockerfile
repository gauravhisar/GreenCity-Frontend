FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./build /app/build

RUN npm install -g serve
CMD ["serve", "-s", "build"]