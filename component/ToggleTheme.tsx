import {useEffect, useRef, useState} from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(false);
  const isDark = useRef(false);

  useEffect(() => {
    const _defa = JSON.parse(window.localStorage && window.localStorage.getItem('isDark') || `false`);
    isDark.current = _defa;
    if (_defa) {
      document.querySelector("html")?.classList.add('dark');
    }
    setTheme(_defa);
  }, []);

  function toggleTheme(event:MouseEvent) {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if(!isAppearanceTransition){
      isDark.current = !isDark.current;
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );

      // @ts-expect-error: Transition API
      const transition = document.startViewTransition(async () => {
        isDark.current = !isDark.current;
      if (document.querySelector("html")?.classList.contains('dark')) {
          // 如果含有指定类，则删除该类
          document.querySelector("html")?.classList.remove('dark');
          window.localStorage && window.localStorage.setItem('isDark', `false`);

      } else {
          // 如果没有指定类，则添加该类
          document.querySelector("html")?.classList.add('dark');
          window.localStorage && window.localStorage.setItem('isDark', `true`);
        }
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          // @ts-ignore
          document.documentElement.animate(
              {
                clipPath: isDark.current
                    ? [...clipPath].reverse()
                    : clipPath,
              },
      {
                duration: 300,
                easing: 'ease-out',
                // @ts-ignore
                pseudoElement: isDark.current  ? '::view-transition-old(root)' : '::view-transition-new(root)',
              }
          );
        });
  }
  // @ts-ignore
  return <a onClick={toggleTheme}>
      <div className={theme ? "text-1.25rem i-tabler-sun-high" : 'text-1.25rem i-tabler-moon'}>{theme}</div>
  </a>;
};

export  default  ToggleTheme;
