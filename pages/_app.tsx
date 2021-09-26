import React from 'react';
import { useEffect } from 'react';
import ContainerBox from '../components/Container';
import Router from 'next/router';
import '../public/style/index.css';
// if(!dev){  console.log = (log) => {}}


export function reportWebVitals(metric) {
    console.log(metric)
}

export default function App({ Component, pageProps }) {

    return  <ContainerBox>
        <Component {...pageProps} />
    </ContainerBox>;
}
