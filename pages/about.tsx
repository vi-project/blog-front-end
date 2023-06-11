import React from 'react';
import {github_url} from "../constant";

const Index: React.FunctionComponent<any> = () => {
    return <>
        <div className="prose m-auto">
            <div className="intro">
                <div className="text-8">
                    <p>在编程世界，我们如果不精进就是退步</p>
                </div>
                <div className="flex justify-center">
                    <a className="link-item" title="github" target="_blank" href={github_url}>
                        <i className="iconfont icongit" />
                    </a>

                    <div className="w-10"></div>
                    <a className="link-item" title="csdn" target="_blank" href="https://blog.csdn.net/qq_34767374">
                        <i className="iconfont iconcsdn1-copy" />
                    </a>
                    <div className="w-10"></div>
                    <a className="link-item" title="cnblogs" target="_blank" href="https://www.cnblogs.com/vincent-c">
                        <i className="iconfont iconblog" />
                    </a>
                </div>
            </div>
        </div>
    </>;
};

export async function getStaticProps() {
    return {
        props: {},
    };
}

export default Index;
