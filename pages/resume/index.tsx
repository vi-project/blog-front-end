import React, { useRef } from "react";
import request from '../../utils/request';
import {genMarkdown} from "../../utils/parse";

const ResumeView: React.FunctionComponent<any> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const ht_ = props.content || "";
    return (
        <div className="prose m-auto">
            <article>
                <div ref={contentRef}
                    className="post-content"
                    style={{ paddingTop: "2rem", backgroundColor: 'white' }}
                    dangerouslySetInnerHTML={{ __html: ht_ }}
                />
            </article>
        </div>
    );
};

export async function getServerSideProps(): Promise<any> {
    try {
        const { data } = await request.get(`/user/resume`, {});
        const md = await genMarkdown();
        data.content = md.render(data.content);
        return { props: data };
    } catch (e) {
        return { props: { error: 'article not exists.' } };
    }
}

export default ResumeView;
