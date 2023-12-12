import Link from 'next/link';
import React from 'react';
import request from "../../utils/request";
import type {I_Category} from "../../@types";

interface I_CategoryProps {
    data: I_Category[]
}

const CategoryPage: React.FunctionComponent<I_CategoryProps> = (props) => {
   const { data } = props;
    return (
        <>
        <div className="prose m-auto">
          <div className="post-title">分类</div>
          <div className="grid grid-cols-2 grid-gap-1 grid-auto-flow">
            {
                  data.map((c: I_Category) => {
                    const {articles = []} = c;
                    const showMore = articles.length > 5;
                    const articleList =  articles.length && articles.slice(0,5) || [];
                    return <div key={c.id} className="item">
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
                          return <article key={art.id} className="ml-8">
                            <Link href="/article/[id]" as={`/article/${art.id}`} >
                              <a className="text-base op-60">
                                {art.title}
                              </a>
                            </Link>
                          </article>;
                        })
                      }
                      {
                          showMore && <Link href="/category/[cId]" as={`/category/${c.id}`}  >
                              <a className="text-sm op-80 ml-8 !decoration-underline" > more  ...  </a>
                          </Link>
                      }
                    </div>;
                  })
            }
          </div>
        </div>
        </>
    );
};

export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const { data } = await request.get(`/category`);
    // Pass data to the page via props
    return { props: { data:data.data} };
}


export default CategoryPage;
