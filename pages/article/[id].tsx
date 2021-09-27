
import request from "../../utils/request";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Header from "../../component/Header";
import {Context} from "koa";
import tocbot from "tocbot";
import {decodeMarkDown} from  '../../utils/parse';
import {IArticleDetail, I_ArticleProps} from '../../@types/index';

const Detail: React.FunctionComponent<IArticleDetail> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const { article: data } = props;
    const [_link, setLink] = useState("");
    const [exp, setExp] = useState(1);
    const [url, setUrl] = useState("");

    useEffect(() => {
        window && setLink(window.location.origin + window.location.pathname);
    }, []);

    const showBig = (src: string) => {
        setUrl(src);
        if(popupRef){
            if(popupRef.current){
                if(popupRef.current.style){
                    popupRef.current.style.display = "block";
                    popupRef.current.style.cursor = "zoom-out";
                }
            }
        }
    };

    useEffect(() => {
        const images = contentRef?.current?.getElementsByTagName("img") || [];
        for (let i = 0; i < images.length; i++) {
            images[i].onclick = function (event) {
                event = event || window.event;
                const target = document.elementFromPoint(event.clientX, event.clientY);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                showBig(target?.src);
            };
        }
    }, []);

    const handleClose = (): void => {
        popupRef && popupRef.current && popupRef.current.style ? (popupRef.current.style.display = "none") : undefined;
    };
    useEffect(() => {
        tocbot.init({
            tocSelector: ".tocbot-list",
            contentSelector: ".post-content",
            headingSelector: "h1, h2, h3, h4",
            collapseDepth: exp,
            orderedList: false,
        });
        return () => tocbot.destroy();
    }, [exp]);

    useEffect(() => {
        const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window &&
            "intersectionRatio" in window.IntersectionObserverEntry.prototype
        ) {
            const lazyImageObserver = new IntersectionObserver(function (
                entries,
            ) {
                entries.forEach(function (entry: IntersectionObserverEntry) {
                    if (entry.isIntersecting) {
                        const lazyImage: Element = entry.target;
                        // @ts-ignore
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        }
        // })
    }, []);


    function handleToTop() {
        window.scrollTo(0, 0);
    }

    function handleBack() {
        window.history.back();
    }

    function handleToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    const ht_ = decodeMarkDown(data.content || "");

    const expMenu = () => {
        setExp(exp === 1 ? 6 : 1);
    };
    return (
        <>
            <Header
                title={data.title}
                isDetail={true}
                keyword={data.keyword}
                description={data.description}
            />
            <div className="container">
                <div className="post-toc">
                    <div className="tocbot-list" />
                    <div className="tocbot-list-menu">
                        <a className="tocbot-toc-expand" onClick={expMenu}>
                            {exp === 1 ? "展开全部" : "折叠"}
                        </a>
                        <a onClick={handleToTop}>返回顶部</a>
                        <a onClick={handleToBottom}>移到底部</a>
                    </div>
                </div>
                <article className="post-wrap">
                    <main role="main">
                        <header className="post-header">
                            <h1 className="post-title">{data.title}</h1>
                            <div className="post-meta">
                                <span className="post-time">创建时间: {data.created_at}</span>
                                {/*<span>&nbsp; 浏览 &nbsp;{data.browse}</span>*/}
                                <div>
                              <span className="post-category">
                                分类:
                                <Link
                                    href={`/category/[cId]`}
                                    as={`/category/${data.category.id}`}
                                >
                                  <a> {data.category && data.category.name} </a>
                                </Link>
                              </span>
                                    </div>
                                </div>
                        </header>

                        <div ref={contentRef}
                            className="post-content"
                            style={{ paddingTop: "2rem" }}
                            dangerouslySetInnerHTML={{ __html: ht_ }}
                        />
                    </main>

                    <div onClick={handleClose} className="popup" ref={popupRef}>
                        <div className="bg">
                            <img src={url} alt={url} />
                        </div>
                    </div>

                    <section className="post-copyright">
                        <p className="copyright-item">
                            <span>版权属于: {data.author}</span>
                        </p>
                        <p className="copyright-item">
                            <span>本文链接:</span>
                            <span>
                            <a target="_Blank" href={_link}>
                              {_link}
                            </a>
                          </span>
                         </p>
                        <p className="copyright-item">
                            <span>转载时须注明出处及本声明</span>
                        </p>
                    </section>
                    <section className="post-tags">
                        <div>
                            <span>Tags:</span>
                            <span className="tag">
                                {data.tags.map((tag:any) => {
                                    return (
                                        <Link key={tag.id} href="/tag/[id]" as={`/tag/${tag.id}`}>
                                            <a style={{ marginRight: "0.5rem" }}># {tag.name} </a>
                                        </Link>
                                    );
                                 })}
                             </span>
                        </div>
                        <div>
                            <a onClick={handleBack}>back</a>
                            {/*<span>· </span>*/}
                            {/*<Link href="/">home</Link>*/}
                        </div>
                    </section>
                </article>
            </div>
        </>
    );


};

const ArticleDetail: React.FunctionComponent<I_ArticleProps> = (props) =>{
    const {article, error} = props;
    if(!article) return <div>{error}</div>;
    return <Detail article={article} />;
};

export async function getServerSideProps(ctx: Context): Promise<any> {
    const {query: {id}} = ctx;
    try{
        const {data} = await request.get(`/article/${id}`,{});
        return { props: { article: data } };
    }catch (e) {
        return { props: { error: 'article not exists.' } };
    }

}

export default  ArticleDetail;



