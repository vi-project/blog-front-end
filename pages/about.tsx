import React from 'react';

const Index: React.FunctionComponent<any> = () => {
    return <>
        <div className="container">
            <div className="intro">
                <div className="avatar">
                    <a>
                        <img src="/avatar.png" alt="avatar" />
                    </a>
                </div>
                <div className="text-3em text-red">
                    Vincent
                </div>
                <div className="description">
                    <p>在编程世界，我们如果不精进就是退步</p>
                </div>
                <div className="links">

                    <a className="link-item" title="github" target="_blank" href="https://github.com/vincent-cy">
                        <i className="iconfont icongit" />
                    </a>

                    <a className="link-item" title="csdn" target="_blank" href="https://blog.csdn.net/qq_34767374">
                        <i className="iconfont iconcsdn1-copy" />
                    </a>

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
