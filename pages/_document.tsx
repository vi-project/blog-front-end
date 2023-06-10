import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
        return (
            <Html lang="zh" >
                <Head />
                <body className="font-sans text-gray-700 dark:text-gray-200 relative">
                  <div className="my-fixed" style={{"maskImage": "radial-gradient(circle, transparent, black)"}}>
                    <canvas width="600" height="600"></canvas>
                  </div>
                  <Main />
                 <NextScript />
                </body>
              <script src="/flow.js" />
            </Html>
        );
    }
}

