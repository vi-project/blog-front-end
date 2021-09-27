import Link from 'next/link';
import React from 'react';
import request from "../../utils/request";
import type {I_Category} from "../../@types";

interface I_CategoryProps {
    data: I_Category[]
}

const CategoryPage: React.FunctionComponent<I_CategoryProps> = (props) => {
   const { data } = props;
    console.log('==========', props);
    return (
        <>
        <div className="container">
            <div className="post-wrap categories">
                <h2 className="post-title">-&nbsp;分类&nbsp;-</h2>
                <div className="categories-card">
                    {
                        data.map((c: I_Category) => {
                            const {articles  = []} = c;
                            const showMore = articles.length > 5;
                            const articleList =  articles.length && articles.slice(0,5) || [];
                            return <div key={c.id} className="card-item">
                                <div className="categories">
                                    <Link href={`/category/[id]`} as={`/category/${c.id}`}>
                                        <a>
                                            <h3>
                                                <i className="iconfont" style={{paddingRight: 4, fontWeight: 500 }}>&#xe626;</i>
                                                {c.name}
                                            </h3>
                                        </a>
                                    </Link>
                                    {
                                        articleList.map(art=> {
                                            return <article key={art.id} className="archive-item">
                                                <Link href="/article/[id]" as={`/article/${art.id}`} >
                                                    <a className="archive-item-link">
                                                        {art.title}
                                                    </a>
                                                </Link>
                                            </article>;
                                        })
                                    }
                                    {
                                        showMore && <Link href="/category/[cId]" as={`/category/${c.id}`}  >
                                            <a className="more-post-link" > More  </a>
                                        </Link>
                                    }

                                </div>
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>
        </>
    );
};

export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const { data } = await request.get(`/category`);
    // Pass data to the page via props
    return { props: { data} };
}


export default CategoryPage;
