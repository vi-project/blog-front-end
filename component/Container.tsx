import NavBar from './NavBar';
import Footer from './Footer';
import React from 'react';
import Header from "./Header";

export default function Container(props: any) {
    return <>
        <Header />
        <NavBar />
        <main className="px-7 py-10">
            {props.children}
            <Footer />
        </main>
    </>;
}
