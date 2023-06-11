FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:16.17.1-nslt-8.6
WORKDIR /app
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install --force
ENV NODE_ENV production
RUN yarn build

#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001
#
#USER nextjs

EXPOSE 8000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
