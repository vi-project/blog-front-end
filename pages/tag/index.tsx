import Link from 'next/link';
import React from 'react';
import request from '../../utils/request';
import type {Tag} from "../../@types";

interface I_TagsProps {
    data: Tag[]
    count: number
}

const TagPage: React.FunctionComponent<I_TagsProps> = (props) => {
    const { data = [] } = props;
    return (
        <>
            {/*<Header title={'标签'} />*/}
            <div className="container">
                <div className="post-wrap tags">
                    <h2 className="post-title">-&nbsp;标签&nbsp;-</h2>
                    <div className="tag-cloud-tags">
                        {
                            data.map(tag=>(
                                 <Link key={tag.id}
                                             href="/tag/[id]"
                                             as={`/tag/${tag.id}`}>
                                    <a >
                                        {tag.name}
                                        <small>
                                            {tag.articleNum}
                                        </small>
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div >
        </>
    );
};



export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const {data } = await request.get(`/tag`);
    // Pass data to the page via props
    return { props: { data } };
}


export default TagPage;
