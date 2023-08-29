const path = require('path')
const glob = require('glob')
function getEntrise (gloabPath) {
	const files = glob.sync(gloabPath),
	entries = {}
	files.forEach((filePath) => {
		const splitstr = filePath.split('/')
		const name = splitstr[splitstr.length - 2].toLocaleLowerCase()
		entries[name] = './' + filePath
	})
	return entries
}

const entries = getEntrise('src/pages/**/index.tsx')

function getIndexJs () {
	const indexJsList = []
	Object.keys(entries).forEach((name) => {
		const indexjs = path.join(__dirname, `../src/pages/${name}/index.tsx`)
		indexJsList.push({
			name,
			path: indexjs
		})
	})
	return indexJsList
}

const appIndex = {}

getIndexJs().forEach((e) => {
	appIndex[e.name] = [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
		e.path
	] // 这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
})

module.exports = {
	appIndex,
	entries,
	...appIndex
}
