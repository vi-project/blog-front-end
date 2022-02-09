import Link from 'next/link';
import React, { Fragment } from 'react';
import Pagination from 'rc-pagination';
import type { Article } from "../@types";
import { useRouter } from 'next/router';

interface I_BaseList {
    data: Article[]
    count: number
    page: number
    basePath: string
}



const ArticleList: React.FunctionComponent<I_BaseList> = (props) => {
    let lastYear = 0;
    const router = useRouter();

    const { data: list, count, page, basePath } = props;

    const itemRender = (current: number, type: any, element: any) => {
        if (type === 'page') {
            return <Link href={`${basePath}/?page=${current}`}><a>{current}</a></Link>;
        }
        return element;
    };


    const onChange = (page: number) => {
        router.push(`${basePath}/?page=${page}`);
    };

    return (
        <div className="post-wrap archive">
            {
                list?.map(art => {
                    const cur_year: number = new Date(art.created_at).getFullYear();
                    const someYear = lastYear === cur_year;
                    if (!someYear) lastYear = cur_year;
                    const renderYear = someYear ? '' : <h3 style={{
                        fontWeight: 'bold'
                    }}>{cur_year}</h3>;
                    return <Fragment key={art.id}>
                        {renderYear}
                        <article className="archive-item">
                            <Link href="/article/[id]" as={`/article/${art.id}`} >
                                <a className="archive-item-link">
                                    {art.title}
                                </a>
                            </Link>
                            <span className="archive-item-date">
                                {art.created_at}
                            </span>
                        </article>
                    </Fragment>;
                })
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    current={page}
                    total={count}
                    itemRender={itemRender}
                    style={{ marginTop: '50px' }}
                    onChange={onChange}
                />

            </div>
        </div>
    );
};

export default ArticleList;
