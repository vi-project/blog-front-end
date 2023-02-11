import { useState, useEffect } from 'react';
import Link from 'next/link';

const navConfig = [
    {
        title: '归档',
        router: '/article'
    },
    {
        title: '分类',
        router: '/category'
    },
    {
        title: '标签',
        router: '/tag'
    }
    ,
    {
        title: '关于',
        router: '/about'
    }
];

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    const [checked, setCheck] = useState(false);

    function handleBtn() {
        setShowMenu(!showMenu);
    }
    function toggleTheme() {
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const theme = currentTheme === 'dark' ? 'light' : 'dark';
        window.localStorage && window.localStorage.setItem('theme',theme);
        const isDark = theme === 'dark';
        setCheck(isDark);
    }
    useEffect(()=>{
            const currentTheme = window.localStorage && window.localStorage.getItem('theme');
            const isDark = currentTheme === 'dark';
             setCheck(isDark);
            if(isDark){
                document.getElementsByTagName('body')[0].classList.add('dark-theme');
            }else{
                document.getElementsByTagName('body')[0].classList.remove('dark-theme');
            }
    },[checked]);


    return <header>
        <nav className="b-red">
            <div className="container">
                <div className="navbar-header header-logo">
                    <Link href={'/'}>
                        <a href=''>
                            Vincent
                        </a>
                    </Link>
                </div>
                <div className="menu navbar-right">
                    {
                        navConfig.map((nav, idx) => {
                            return <Link key={idx} href={nav.router} >
                                <a className="menu-item" >{nav.title}</a>
                            </Link>;
                        })
                    }
                        <input id="switch_default" checked={checked} type="checkbox" onChange={toggleTheme} className="switch_default"/>
                        <label htmlFor="switch_default" className="toggleBtn" ></label>
                </div>
            </div>
        </nav>

        <nav className="navbar-mobile" >
            <div className="container">
                <div className="navbar-header">
                    <div>
                        <Link href={'/'}>
                            <a href=''>
                                Vincent
                            </a>
                        </Link>
                        <div style={{ display: 'inline-block' }} onClick={toggleTheme}>·&nbsp;{checked?'Light': 'Dark'}</div>
                    </div>
                    <div className={`menu-toggle ${showMenu ? 'active' : null}`} onClick={handleBtn}>&#9776; Menu</div>
                </div>
                <div className={`menu ${showMenu ? 'active' : null}`} >
                    {
                        navConfig.map((nav, idx) => {
                            return <Link key={idx} href={nav.router} >
                                <a className="menu-item" >{nav.title}</a>
                            </Link>;
                        })
                    }
                </div>
            </div>
        </nav>
    </header>;
}
