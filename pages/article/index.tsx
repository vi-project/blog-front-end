import React from 'react';
import request from '../../utils/request';
import type { I_BaseList } from "../../@types";
import { NextPageContext } from "next";
import ArticleBaseList from "../../component/ArticleBaseList";

const ArticleList: React.FunctionComponent<I_BaseList> = (props) => {
    const basePath = `/article`;
    return <ArticleBaseList {...props} basePath={basePath} />;
};

export async function getServerSideProps(ctx: NextPageContext): Promise<any> {
    // Fetch data from external API
    const { page = 1 } = ctx.query;
    const payload = {
        page,
    };
    const { data } = await request.get(`/article`, payload);
    // Pass data to the page via props
    return { props: { ...data } };
}

export default ArticleList;
