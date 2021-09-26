
import request from "../../utils/request";
import React from 'react';
import {Context} from "koa";
import type {Article} from '../../@types';

type Props = {
    data: Article
}

export default function Detail({data: {data}}: Props){
    return <div>{data.content}</div>;
}

export async function getServerSideProps(ctx: Context): Promise<any> {
    const {query: {id}} = ctx;
    const {data} = await request.get(`/article/${id}`,{});
    return { props: { data } };
}
