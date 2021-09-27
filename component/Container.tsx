import NavBar from './NavBar';
import Footer from './Footer';
import React from 'react';
import Header from "./Header";

export default function Container(props: any) {
    return <>
        <Header />
        <div className="wrapper" >
            <NavBar />
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>
    </>;
}
