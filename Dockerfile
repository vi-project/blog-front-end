FROM registry.cn-hangzhou.aliyuncs.com/person-project/node:2.0.0 AS deps

WORKDIR /app
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install --force
ENV NODE_ENV production
RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


USER nextjs

EXPOSE 8000


CMD ["yarn", "start"]
