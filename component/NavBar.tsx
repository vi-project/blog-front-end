import Link from 'next/link';
import ToggleTheme from "./ToggleTheme";
import {github_url} from "../constant";

const navConfig = [
    {
        title: '归档',
        router: '/article',
        icon: 'i-tabler-article'
    },
    {
        title: '分类',
        router: '/category',
        icon: 'i-tabler-category'
    },
    {
        title: '标签',
        router: '/tag',
        icon: 'i-tabler-tag'
    },
    {
        title: '书籍',
        router: '/book',
        icon: 'i-tabler-tag'
    },
    {
        title: '关于',
        router: '/about',
        icon: 'i-tabler-user'
    }
];

export default function NavBar() {
    return <header className="z-40 header">
        <Link href={'/'}>
            <a href=''  className="w-10 h-10 absolute lg:fixed m-6 select-none outline-none">
                <div className="i-tabler-home h-6 w-7" style={{color: "var(--vincent-fg)"}}></div>
            </a>
        </Link>
        <nav className="nav">
            <div />
            <div className="right">
                    {
                        navConfig.map((nav, idx) => {
                            return <Link key={idx} href={nav.router} >
                                <a className="menu-item" >
                                    <span className="lt-md:hidden">{nav.title}</span>
                                    <div className={`md:hidden text-1.25rem ${nav.icon}`}></div>
                                </a>
                            </Link>;
                        })
                    }
                    <Link href={github_url}>
                        <a className="menu-item" >
                            <div className={`text-1.25rem i-tabler-brand-github`}></div>
                        </a>
                    </Link>
                    <ToggleTheme />
            </div>
        </nav>
    </header>;
}
