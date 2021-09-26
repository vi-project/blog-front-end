import Link from 'next/link';
import React from 'react';
import request from '../../utils/request';
import type {Article} from "../../@types";

type Props = {
    data: Article[]
}

const ArticleList: React.FunctionComponent<any> = ({ data }: Props) => {
    return (
        <ul>
            {
                data.map(item => (
                    <li  key={item.id}>
                        <Link href={`/article/${item.id}`} >
                            <a>{item.title}</a>
                        </Link>
                    </li>
                ))
            }
            <li>
                <Link href="/a" as="/a">
                    <a>ab</a>
                </Link>
            </li>
            <li>
                <Link href="/b" as="/b">
                    <a>b</a>
                </Link>
            </li>
        </ul>
    );
};

export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const data = await request.get(`/article`);
    // Pass data to the page via props
    return { props: { data } };
}


export  default  ArticleList;