import Link from 'next/link';
import React, {Fragment ,useEffect,useState} from 'react';
// import Pagination from './Pagination'
// import Api from '../redux/api'
import request from '../utils/request';
import type {Article} from "../@types";
import {NextPageContext} from "next";


interface I_BaseList {
    categoryId?: number
    tagId?: number
}


interface I_RequestParams {
    page?: number
    size?: number
    tag?: number | null
    category?: number | null
}

const size = 10;


const ArticleList: React.FunctionComponent<I_BaseList> = (props) => {
    console.log('==================', props);
    let lastYear: number = 0;
    // const [meta, setMete] = useState({});

    return (
        <div className="post-wrap archive">
            {
                props.data.map(art => {
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


            <div className="pagination">
                {/*{*/}
                {/*    meta.count ?*/}
                {/*        <Pagination totalCount={meta.count} onChange={onChange} pageSize={pageSize} pageNeighbours={1} />*/}
                {/*        : null*/}
                {/*}*/}
            </div>
        </div>
    );
};



export async function getServerSideProps(ctx: NextPageContext): Promise<any> {
    // Fetch data from external API
    console.log(ctx);
    const { data } = await request.get(`/article`);
    // Pass data to the page via props
    return { props: { data: data.list } };
}


export default ArticleList;
