import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import 'highlight.js/styles/github.css'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
// import '../markdown.css'
import 'github-markdown-css'
import uslug from 'uslug'
const uslugify = (s: any) => {
	return uslug(s)
}

const md = markdownIt({
	html: false,
	xhtmlOut: true,
	typographer: true,
	highlight: function (str: any, lang: any) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value
			} catch (__) {}
		}
		return '' // 使用额外的默认转义
	}
})
	.use(markdownItAnchor, { permalink: true, permalinkBefore: true, permalinkSymbol: '§', slugify: uslugify })
	.use(markdownItTocDoneRight, {
		slugify: uslugify,
		level: 2,
		containerClass: 'outline',
		format (x: any, htmlencode: (arg0: any) => any) {
			return `<span class='link'>${htmlencode(x)}</span>`
		}
	})

export default (str: string) => md.render(str)
