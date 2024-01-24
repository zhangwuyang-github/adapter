FROM node:18-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && apk add --no-cache tzdata
ENV TZ=Asia/Shanghai

RUN yarn config set registry https://registry.npmmirror.com

WORKDIR /src

COPY . .

RUN yarn install

CMD ["yarn", "prod"]
