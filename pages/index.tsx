import React from 'react';
import request from '../utils/request';

const Index:React.FunctionComponent<any> = (props) => {
    const { data } = props;
    return <div className="main">
        <div className="container">
            <div className="post-wrap">
                <div className="intro">
                    <h1 className="home-title">{data.title}</h1>
                      <p className="home-description">
                        {data.content}
                        <span>&nbsp;&nbsp;{data.from}
                        <time>{data.created_at}</time>
                    </span>
                  </p>
                </div>
            </div>
        </div>
    </div>;
};


export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const {data} = await request.get('daily/latest');
    // Pass data to the page via props
    return { props: { data } };
}

export default Index;
