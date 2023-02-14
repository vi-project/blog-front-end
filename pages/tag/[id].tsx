
import React  from "react";
import request from "../../utils/request";
import {NextPageContext} from "next";
import ArticleBaseList from "../../component/ArticleBaseList";
import {I_BaseList} from "../../@types";
import NotFound from "../../component/NotFound";

const TagDetail: React.FunctionComponent<I_BaseList> = (props) =>{
    console.log('props', props);
    const basePath = `/tag/${props.id}`;
    return <div className="prose m-auto">
        {
            !props.tag ? <NotFound /> : <>
                <div className="pointer-events-none">
                    <span className="text-4em">{props.tag.name}</span>
                </div>
                <ArticleBaseList {...props} basePath={basePath} />
            </>
        }
    </div>;
};

export async function getServerSideProps(ctx: NextPageContext): Promise<any> {
    // Fetch data from external API
    const {page=1, id} = ctx.query;
    const payload = {
        tagId: id,
        page,
    };
    const {data} = await request.get(`/article`, payload);
    // Pass data to the page via props
    return { props: { ...data , id}  };
}


export default  TagDetail;



