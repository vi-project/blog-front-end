
import request from "../../utils/request";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Header from "../../component/Header";
import { Context } from "koa";
import {genMarkdown} from '../../utils/parse';
import { IArticleDetail, I_ArticleProps } from '../../@types/index';

const Detail: React.FunctionComponent<IArticleDetail> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const { article: data } = props;
    const [_link, setLink] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        window && setLink(window.location.origin + window.location.pathname);
    }, []);

    const showBig = (src: string) => {
        setUrl(src);
        if (popupRef) {
            if (popupRef.current) {
                if (popupRef.current.style) {
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


    function handleBack() {
        window.history.back();
    }

    const ht_ = data.content || "";
    return (
        <>
            <Header
                title={data.title}
                isDetail={true}
                keyword={data.keyword}
                description={data.description}
            />
                <article className="prose m-auto mb-8">
                    <header className="post-header">
                            <h1 className="mb-0 text-2rem">{data.title}</h1>
                            <div className="post-meta">
                                <span className="opacity-50 !-mt-2">{data.created_at}</span>
                                <span className="post-category">
                                    <Link  href={`/category/[cId]`} as={`/category/${data.category.id}`}>
                                        <a> {data.category && data.category.name} </a>
                                    </Link>
                                </span>
                            </div>
                        </header>

                        <div ref={contentRef}
                             className="prose m-auto slide-enter-content"
                             dangerouslySetInnerHTML={{ __html: ht_ }}
                        />

                        <div onClick={handleClose} className="popup" ref={popupRef}>
                            <div className="bg">
                                <img src={url} alt={url} />
                            </div>
                        </div>

                        <section className="post-copyright">
                            <p className="copyright-item">
                                <span>版权属于: {data.author.nickname}</span>
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
                                    {data.tags.map((tag: any) => {
                                        return (
                                            <Link key={tag.id} href="/tag/[id]" as={`/tag/${tag.id}`}>
                                                <a style={{ marginRight: "0.5rem" }}># {tag.name} </a>
                                            </Link>
                                        );
                                    })}
                                </span>
                            </div>
                            <div>
                                {/*<a  >cd ... >>> </a>*/}
                                <a className="cursor-pointer" onClick={handleBack}> ··· </a>
                            </div>
                        </section>
                    </article>
        </>
    );
};

const ArticleDetail: React.FunctionComponent<I_ArticleProps> = (props) => {
    const { article, error } = props;
    if (!article) return <div className="container">
        <article className="prose m-auto h-85 flex justify-center items-center">
            <h1> {error}</h1>
        </article></div>;
    return <Detail article={article} />;
};

export async function getServerSideProps(ctx: Context): Promise<any> {
    const { query: { id } } = ctx;
    try {
        const { data } = await request.get(`/article/${id}`, {});
        const md = await genMarkdown();
        data.content = md.render(data.content);
        return { props: { article: data } };
    } catch (e) {
        return { props: { error: 'article not exists.' } };
    }
}

export default ArticleDetail;



