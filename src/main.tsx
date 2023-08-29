import React from 'react'
import ReactDOM from 'react-dom'
import '@/index.css'

/**
 * 定义一个渲染组件，将 React 组件渲染到指定的 DOM 节点上。
 * @param props 页面组件
 */
function renderMain (props: JSX.Element) {
	ReactDOM.render(<React.StrictMode>{props}</React.StrictMode>, document.getElementById('root'))
}

/**
 * 为了在开发环境下实现热更新（hot module replacement）功能，当代码发生变化时，不需要刷新整个页面，而只需要更新部分代码：
 * 检查当前模块是否支持热更新，如果支持则继续执行下面的代码。
 * 注册一个 webpackHotUpdate 事件监听器，当代码发生变化时会触发这个事件。
 * 获取所有的 link 元素，这些元素是用来引入样式文件的。
 * 对每个 link 元素，修改其 href 属性，加上一个时间戳，强制浏览器重新加载样式文件。
 * 这样做的目的是为了实现样式的热更新，避免在修改样式后需要手动刷新页面才能看到效果。
 */
if ((module as any).hot) {
	(module as any).hot.accept()
	var hotEmitter = require('webpack/hot/emitter')
	// 注册一个 webpackHotUpdate 事件监听器，当代码发生变化时会触发这个事件
	hotEmitter.on('webpackHotUpdate', function (currentHash: any) {
		// 获取所有的 link 元素
		document.querySelectorAll('link[href][rel=stylesheet]').forEach((link: any) => {
			// 每个 link 元素，修改其 href 属性，加上一个时间戳，强制浏览器重新加载样式文件。
			link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
		})
	})
}
export default renderMain
