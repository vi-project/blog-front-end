import MarkdownIt from 'markdown-it';
import shiki from 'shiki';
// @ts-ignore
import TOC from 'markdown-it-table-of-contents';
import { remove } from 'diacritics';
import anchor from "markdown-it-anchor";
import LinkAttributes from 'markdown-it-link-attributes';


let darkHighlighter!: shiki.Highlighter;

let lightHighlighter!:shiki.Highlighter;

const rControl = /[\u0000-\u001F]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

function slugify(str:string) {
    return (
        remove(str).replace(rControl, '')
            .replace(rSpecial, '-')
            .replace(/-{2,}/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/^(\d)/, '_$1')
            .toLowerCase()
    );
}

let markdown!:MarkdownIt;
export const genMarkdown = async () => {
  if(markdown) return markdown;
  if(!darkHighlighter){
    darkHighlighter = await shiki.getHighlighter({
      theme: 'vitesse-dark'
    });
  }

  if(!lightHighlighter){
    lightHighlighter = await shiki.getHighlighter({
      theme: 'vitesse-light'
    });
  }
   const md = MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (code: string, l:string) => {
          const lang = l || 'js';
          const darkHtml = darkHighlighter.codeToHtml(code, { lang });
           const dark = darkHtml.replace('<pre class="shiki ', '<pre class="shiki shiki-dark ');
           const lightHtml = lightHighlighter.codeToHtml(code, { lang });
           const light = lightHtml.replace('<pre class="shiki ', '<pre class="shiki shiki-light ');
          return `<pre hidden></pre><div class="shiki-container language-${lang}">${dark}${light}</div>`;
        },
    });

    md.use(anchor, {
      slugify,
      permalink: anchor.permalink.linkInsideHeader({
        symbol: '#',
        renderAttrs: () => ({ 'aria-hidden': 'true' }),
      }),
    });

    md.use(TOC, {
      includeLevel: [1, 2, 3],
      slugify,
    });


    md.use(LinkAttributes, {
        matcher: (link: string) => /^https?:\/\//.test(link),
        attrs: {
            target: '_blank',
            rel: 'noopener',
        },
    });

  const defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, imageOptions, env, self) {
    const token = tokens[idx];

    const attrs = token.attrs || [];

    const attrObj: any = {};

    attrs.forEach(v => {
      // @ts-ignore
      attrObj[v[0]] = v[1];
    });

    token.attrSet('class', "lazy");

    token.attrSet('style', "max-width: 100%;");

    token.attrSet('alt', token.content);

    token.attrSet('data-src', `${attrObj.src}`);

    token.attrSet('src', `${attrObj.src}&lazyLoad`);

    return defaultImageRenderer!(tokens, idx, imageOptions, env, self);
  };

  markdown = md;
  return md;
};
