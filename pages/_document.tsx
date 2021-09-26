import Document, { Html,Head, Main, NextScript } from 'next/document';
import React  from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="zh" >
                <Head> </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

