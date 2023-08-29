/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2021-12-06 17:58:59
 * @LastEditTime: 2022-09-09 15:44:25
 * @Descripttion: file content
 */
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base')
module.exports = merge(base, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		open: true,
		static: path.resolve(__dirname, '../build'),
		port: 3001,
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
	]
})
