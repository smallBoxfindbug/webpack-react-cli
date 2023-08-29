/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2021-12-06 17:59:14
 * @LastEditTime: 2021-12-06 18:32:59
 * @Descripttion: file content
 */
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge(base, {
	mode: 'production'
});
