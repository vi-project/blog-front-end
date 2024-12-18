import Head from "next/head";
import React, {useEffect} from 'react';

const Header = (props: any) => {
    const { title = '',
        keyword = '前端知识,前端博客,web前端,CSS,javascript,前端开发,前端技术博客,Vincent前端博客,前端知识积累',
        description = 'Vincent 个人博客, 分享、记录和总结工作中的开发经验!专注于前端知识,前端博客,web前端博客,Vincent前端博客,前端开发,前端技术博客,前端知识,前端积累,CSS,javascript'
    } = props;

   useEffect(() =>{
       const script = document.createElement('script');
       script.append(`
        (function () {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          const isDark = localStorage.getItem('isDark') || 'false'
          if (isDark === 'true')
            document.documentElement.classList.toggle('dark', true)
        })() 
       `);
       document.head.append(script);
   },[]);

    return <Head >
        <title >{title || "个人的学习历程"}</title>
        <meta name="keywords" content={keyword} />
        <meta name='description' content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link type="text/css" rel="styleSheet" href="//at.alicdn.com/t/font_1987433_wl53fgt2ay.css" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="shenma-site-verification" content="5397f6d950bbbad584d6f83dc807f7c1_1597487844"></meta>
    </Head>;
};

export default Header;
