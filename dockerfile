FROM node:latest 

WORKDIR /src/app/server

COPY ./package-lock.json /src/app/server

COPY ./package.json /src/app/server

RUN npm i

CMD ["npm","run","start:dev"]
