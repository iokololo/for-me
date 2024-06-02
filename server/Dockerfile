# syntax=docker/dockerfile:1

FROM node:18
ENV NODE_ENV=production

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

CMD ["node", "index.js"]