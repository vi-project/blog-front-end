FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:16.17.1-nslt-8.6
WORKDIR /app
COPY . .

RUN chown -R nextjs:nextjs /app

USER nextjs

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install --force
ENV NODE_ENV production
RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


EXPOSE 8000

CMD ["yarn", "start"]
