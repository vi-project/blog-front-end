import React, {useRef} from "react";
import request from '../../utils/request';
import {decodeMarkDown} from "../../utils/parse";

const ResumeView: React.FunctionComponent<any> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const ht_ = decodeMarkDown(props.data || "");

    return (
        <div className="container">
            <article className="post-wrap">
                <div ref={contentRef}
                    className="post-content"
                    style={{ paddingTop: "2rem" }}
                    dangerouslySetInnerHTML={{ __html: ht_ }}
                    />
            </article>
        </div>
    );
};


export async function getServerSideProps(): Promise<any> {
    try{
        const {data} = await request.get(`/resume`,{});
        return { props: { data } };
    }catch (e) {
        return { props: { error: 'article not exists.' } };
    }

}


export default ResumeView;
