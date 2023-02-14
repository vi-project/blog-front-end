import {useEffect, useState} from "react";


const ToggleTheme = () => {
  const [checked, setCheck] = useState(false);

  const [theme, setTheme] = useState('dark');
  function toggleTheme() {
    const currentTheme = window.localStorage && window.localStorage.getItem('theme');
    const theme_ = currentTheme === 'dark' ? 'light' : 'dark';
    window.localStorage && window.localStorage.setItem('theme',theme_);
    setTheme(theme_);
    const isDark = theme_ === 'dark';
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


  return <a onClick={toggleTheme}>
      <div className={theme === 'dark' ? "text-1.25rem i-tabler-sun-high" : 'text-1.25rem i-tabler-moon'}>{theme}</div>
  </a>;
};

export  default  ToggleTheme;
