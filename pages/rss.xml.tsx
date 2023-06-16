import RSS from 'rss';
import { GetServerSideProps } from 'next';
import request from '../utils/request';
import { Article } from '../@types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // 创建一个新的 RSS Feed 实例
  const feed = new RSS({
    title: 'Vincent blog',
    site_url: 'https://www.wekic.com',
    description: 'Vincent 个人博客, 分享、记录和总结工作中的开发经验!专注于前端知识,前端博客,web前端博客,Vincent前端博客,前端开发,前端技术博客,前端知识,前端积累,CSS,javascript',
    feed_url: "https://www.wekic.com/rss.xml"
  });

  // const urls = await fetch('https//example.com/api')
  const {data}: {data: {data:Article[]}} = await request.get(`/article`, { size: 1000, status: 'post' });

  data.data.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      categories: [post.category.name],
      url: `https://www.wekic.com/article/${post.id}`,
      date: new Date(post.created_at)
    });
  });

  ctx.res.setHeader('Content-Type', 'application/xml');
  ctx.res.write(feed.xml({ indent: true }));
  ctx.res.end();

  return {
    props: {},
  };
};

// Default export to prevent next.js errors
export default () => null;
