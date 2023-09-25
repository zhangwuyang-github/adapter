FROM node:18-alpine

WORKDIR /src

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY src .

RUN npm i -g @nestjs/cli
RUN npm ci --production

COPY dist ./dist

EXPOSE 9000

CMD ["node", "./dist/main.js"]
