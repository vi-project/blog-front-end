import Link from 'next/link';
import React, {Fragment} from 'react';
// import Pagination from './Pagination'
// import Api from '../redux/api'
import type {Article} from "../@types";


interface I_BaseList {
    data: Article[]
    count: number
    page: number
    basePath: string
}


const ArticleList: React.FunctionComponent<I_BaseList> = (props) => {
    let lastYear: number = 0;

    const {data:list, count, page, basePath} = props;

    const isFirstPage = +page === 1;

    const pageCount =  Math.ceil(count / 10) || 0;

    const temp = Array(pageCount).fill(1);

    const isLastPage = +page === pageCount;

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
            <div >
                {
                    !!count ? <nav aria-label="Page navigation" className="page-center">
                        <ul className="pagination">
                            <li className={isFirstPage ? 'disabled' : '' }>
                                {
                                    isFirstPage ? <span>
                                        <span aria-hidden="true">&laquo;</span>
                                    </span>: <Link href={`${basePath}/?page=${+page - 1}`} >
                                        <a aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </Link>
                                }
                            </li>
                            {
                                temp.map((_,i)=>{
                                    return (
                                        <Fragment key={i}>

                                            <li className={+page === (i+1) ? "active": ''}>
                                                <Link href={`${basePath}/?page=${i + 1}`} >
                                                    <a >{i+1}</a>
                                                </Link>
                                            </li>

                                        </Fragment>
                                    );
                                })
                            }
                            <li className={isLastPage ? 'disabled' : '' }>
                                {
                                    isLastPage? <span> <span aria-hidden="true">&raquo;</span> </span>
                                        :  <Link href={`${basePath}/?page=${+page + 1}`} >
                                            <a aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </Link>
                                }
                            </li>
                        </ul>
                    </nav> : null
                }

            </div>
        </div>
    );
};

export default ArticleList;
