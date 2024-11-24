import React from 'react';
export default function Footer() {
    return <footer className="w-full bottom-0">
        <div className="mt-10 mb-6 prose m-auto opacity-50 flex text-center">
            <span className="text-sm align-middle">
                <a style={{  textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://beian.miit.gov.cn"
                >湘ICP备20014327号-1</a>
            </span>
        </div>
    </footer>;
}
