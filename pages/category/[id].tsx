
import React  from "react";
import request from "../../utils/request";
import {NextPageContext} from "next";
import ArticleBaseList from "../../component/ArticleBaseList";
import {I_BaseList} from "../../@types";

const CategoryDetail: React.FunctionComponent<I_BaseList> = (props) =>{
    const basePath = `/category/${props.id}`;
    return <ArticleBaseList {...props} basePath={basePath} />;
};

export async function getServerSideProps(ctx: NextPageContext): Promise<any> {
    // Fetch data from external API
    const {page= 1, id} = ctx.query;
    const payload = {
        category: id,
        page,
    };
    const {data} = await request.get(`/article`, payload);
    // Pass data to the page via props
    return { props: { ...data , id}  };
}


export default  CategoryDetail;



