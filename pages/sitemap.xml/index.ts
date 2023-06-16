import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import request from '../../utils/request';
import { Article } from '../../@types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const urls = await fetch('https//example.com/api')
    const {data}: any = await request.get(`/article`, { size: 1000, status: 'post' });
    const urls = data.data.map((u: Article) => ({
        loc: `https://www.wekic.com/article/${u.id}`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly"
        // priority
    }));

    urls.push({
        loc: 'https://www.wekic.com',
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
    });
    urls.push({
        loc: 'https://www.wekic.com/article',
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
    });

    return getServerSideSitemap(ctx, urls);
};

// Default export to prevent next.js errors
export default () => null;
