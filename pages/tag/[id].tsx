
import React  from "react";
import {NextRouter, useRouter} from 'next/router';
import ArticleBaseList from "../../components/ArticleBaseList";


const TagDetail: React.FunctionComponent = () =>{
    const router: NextRouter = useRouter();
    const id = Number(router.query.id);
    const tagId = isNaN(id)? 0 : id;
    // return <div>23</div>
    return <ArticleBaseList tagId={tagId} />;
};

export default  TagDetail;



