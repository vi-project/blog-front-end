import next from 'next';

import Koa, { Context, Next } from 'koa';

import Router from '@koa/router';

import { config } from './config';

const app = next({ dev: config.isDev });

const handle = app.getRequestHandler();

// // https://github.com/vercel/next.js/tree/canary/examples/with-typescript

// // https://blog.csdn.net/weixin_33701564/article/details/87962120

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.all('(.*)', async (ctx: Context) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx: Context, next: Next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(config.port, () => {
    console.log(`> Ready on http://localhost:${config.port}`);
  });
});
