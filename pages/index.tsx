import React from 'react';
import request from '../utils/request';

const Index: React.FunctionComponent<any> = (props) => {
    const { data } = props;
    return  <div className="prose m-auto flex" style={{alignItems: 'center', height: "calc(100vh - 20rem)"}}>
          <div>
            <h1 className="home-title b-red">{data.title}</h1>
            <p className="home-description">
              {data.content}
              <span>
                  {data.from}
                <time>{data.created_at}</time>
              </span>
            </p>
          </div>
    </div>;
};


export async function getServerSideProps(): Promise<any> {
    // Fetch data from external API
    const { data } = await request.get('daily/latest');
    // Pass data to the page via props
    return { props: { data } };
}

export default Index;
