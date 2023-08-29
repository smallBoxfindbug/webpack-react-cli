// dev-server.js
const express = require('express')
const webpackConfig = require('../config/webpack.dev')
const path = require('path')
const chalk = require('chalk')
const app = express()
const port = webpackConfig.devServer.port
const fs = require('fs')

app.use(require('connect-history-api-fallback')()) // 解决history路由模式浏览器刷新404问题
// webpack编译器
const compiler = require('webpack')(webpackConfig)

// webpack-dev-server中间件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
	stats: {
		colors: true,
		chunks: true
	}
})
app.use(devMiddleware)

app.use(
	require('webpack-hot-middleware')(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	})
)

//同步读取文件的方法
function getFileMime (extname) {
	var data = fs.readFileSync(path.join(__dirname, '../config/mime.json'))
	// 根据左边的扩展名获取右边的响应头
	let mimeObj = JSON.parse(data.toString())
	return mimeObj['.' + extname]
}

app.use(express.static(path.join(__dirname, '../build'), { index: false }))

app.get('/:viewname?', function (req, res) {
	const urls = req.params.viewname.split('.')
	const filepath = path.join(compiler.outputPath, urls[0], 'index.html')
	compiler.outputFileSystem.readFile(filepath, function (err, result) {
		// 使用webpack提供的 outputFileSystem 读取内存中的文件
		res.set({ 'Content-Type': '' + getFileMime(urls[urls.length - 1]) + ';charset="utf-8"' })
		if (err) {
			compiler.outputFileSystem.readFile(path.join(compiler.outputPath, '/index/index.html'), (err, r) => {
				res.send(r)
				res.end()
				return
			})
		}
		res.send(result)
		res.end()
		return
	})
})

app.listen(port, function (err) {
	if (err) {
		console.log(err)
		return
	}
	console.log(chalk.green(`=============================================================\n`))
	console.log(chalk.green(`**********************- webpack-react-cli -******************\n`))
	console.log(chalk.green(`****************- running http://localhost:${port} -************\n`))
	console.log(chalk.green(`=============================================================\n`))
	require('child_process').exec('start http://localhost:' + port)
})
