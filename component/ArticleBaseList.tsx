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
        <>
            <ul>
            {
                list?.map(art => {
                    const cur_year: number = new Date(art.created_at).getFullYear();
                    const someYear = lastYear === cur_year;
                    if (!someYear) lastYear = cur_year;
                    const renderYear = someYear ? null : <div className="relative pointer-events-none  h20">
                        <span className="absolute  text-8em  op-6 left--3rem top--1.5rem">{cur_year}</span>
                    </div>;
                    return <Fragment key={art.id}>
                        {renderYear}
                        <Link  href='/article/[id]' as={`/article/${art.id}`} >
                            <a className="item block font-normal mb-6 mt-2 no-underline" >
                                <li className="no-underline">
                                    <div className="title text-lg leading-1.2em">
                                        <span className="align-middle">{art.title}</span>
                                    </div>

                                    <div className="text-sm">
                                        <span className="op50">
                                            {art.created_at}
                                        </span>
                                    </div>
                                </li>
                            </a>
                            </Link>
                    </Fragment>;
                })
            }
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    current={page}
                    total={count}
                    itemRender={itemRender}
                    style={{ marginTop: '50px' }}
                    onChange={onChange}
                />

            </div>
        </>
    );
};

export default ArticleList;
