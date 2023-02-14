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
    console.log(props);
    return (
        <>
            {/*<Header title={'标签'} />*/}
            <div className="prose m-auto">
                <div className="tags">
                    <h2 className="post-title">-&nbsp;标签&nbsp;-</h2>
                    <div className="">
                        {
                            data.map(tag=>(
                                 <Link key={tag.id}
                                             href="/tag/[id]"
                                             as={`/tag/${tag.id}`}>
                                    <a className="p-3 op-80 inline-block">
                                        {tag.name}
                                        <small>
                                            ({tag.articles.length})
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
    const { data } = await request.get(`/tag`);
    // Pass data to the page via props
    return { props: { data: data.data } };
}


export default TagPage;
