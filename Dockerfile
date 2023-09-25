FROM node:18.16.1

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && apk add --no-cache tzdata
ENV TZ=Asia/Shanghai

RUN yarn config set registry https://registry.npm.taobao.org

WORKDIR /src

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY src .

RUN yarn install

EXPOSE 9000

CMD ["npm", "start"]
