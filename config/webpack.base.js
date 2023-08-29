/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2021-12-06 17:58:29
 * @LastEditTime: 2022-09-09 14:39:01
 * @Descripttion: file content
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const paths = require('./paths')
const webpack = require('webpack')
module.exports = {
	entry: paths.appIndex,
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: '[name]/static/js/[name][hash:5].js',
		chunkFilename: '[name]/static/js/[name][hash:5].js',
		environment: {
			arrowFunction: false
		},
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
			},
			{
				test: /\.less$/,
				use: [ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader' ]
			},
			{
				test: /\.(png|jpg|git|webp)$/,
				loader: 'url-loader',
				type: 'javascript/auto',
				options: {
					limit: 8 * 1000,
					esModule: false,
					name: 'static/images/[name].[ext]'
				}
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'html-loader'
					},
					{
						loader: 'markdown-loader'
					}
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(ts|tsx)$/i,
				exclude: /node_modules/,
				use: [ 'babel-loader', 'ts-loader' ]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		...Object.keys(paths.entries).map((name) => {
			return new HtmlWebpackPlugin({
				inject: true,
				template: path.resolve(__dirname, '../public/index.html'),
				chunks: [ name ],
				title: name,
				filename: name + '/index.html',
				favicon: path.resolve(__dirname, '../public/favicon.ico'),
				excludeChunks: [ Object.keys(paths.entries).filter((item) => item.name === name).map((item) => item.name) ]
			})
		}),
		new MiniCssExtractPlugin({
			filename: '[name]/static/css/[name].[hash:8].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				REACT_APP_API_URL : process.env.REACT_APP_API_URL
			}
		})
		// new BundleAnalyzerPlugin()
	],
	resolve: {
		extensions: [ '.js', '.json', '.jsx', '.ts', '.tsx' ],
		alias: {
			'@': path.resolve('src'),
			'@router': path.resolve('src/router'),
			'@utils': path.resolve('src/utils'),
			'@pages': path.resolve('src/pages'),
			'@assets': path.resolve('src/assets'),
			'@hooks': path.resolve('src/hooks'),
			'@doc': path.resolve('src/doc'),
			'@api': path.resolve('src/api')
		}
	},
	optimization: {
		splitChunks: {
			chunks: 'async', //
			minSize: 0, // 引入模块大于minSize（kb）才进行代码分割
			maxSize: 1, // 如果打包好的js大于maxSize（kb）,则会进行二次分割
			minChunks: 1, // 引入模块至被使用minChunks(次)后才进行代码分割
			maxAsyncRequests: 5, // 同时加载的模块数不超过maxAsyncRequests， 如果超过 maxAsyncRequests， 剩余的模块不做代码分割
			maxInitialRequests: 3, // 入口文件同时加载的模块数不超过 maxInitialRequests
			automaticNameDelimiter: '-', // 生成文件名称的链接符号 如 vendors-main.js
			// name: true,
			// 根据 cacheGroups，判断分割到哪里去
			cacheGroups: {
				// 如果是 node_modules 里的，打包到vendors.js 里
				vendors: {
					// 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
					test: /[\\/]node_modules[\\/]/,
					priority: -20,
					filename: 'vendors.js' // 打包文件名
				},
				// 除了 node_modules 里的，放到 common.js 里
				default: {
					minChunks: 2,
					priority: -20,
					filename: 'common.js',
					reuseExistingChunk: true // 是否复用已打包代码
				}
			}
		}
	}
}
