// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import marked from 'marked';
import hl from 'highlight.js';
// 继承marked中的Renderer类 覆盖Renderer中的 image方法

class Renderer extends marked.Renderer{
    private options: any;
    image(href: string, title: string, text: string) {
        if (href === null) {
            return text;
        }
        let out = '<img class="lazy" ' +
            'src="' + href + '&lazyLoad' + '" ' +
            'data-src="' + href + '" ' +
            'alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
    }
}

marked.setOptions({
    renderer: new Renderer(),
    highlight: function(code: string, lang: string) {
        hl.configure({classPrefix: ''});
        const language = hl.getLanguage(lang) ? lang : 'plaintext';
        return hl.highlight(language, code).value;
    },
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    xhtml:true,
    smartypants: false,
});

function htmlSpecialCharsDecode(str = ''){
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, "''");
    str = str.replace(/&#039;/g, "'");
    return str;
}


export function decodeMarkDown(context:string){
    return marked(htmlSpecialCharsDecode(context));
}
