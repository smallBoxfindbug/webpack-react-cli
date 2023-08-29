/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-07-20 14:48:24
 * @LastEditTime: 2022-08-30 13:27:59
 * @Descripttion: file content
 */

import { ArticleDetail } from '@/types/Article'
import { $get, $post } from '@api/http'

const BaseUrl = 'http://localhost:8080'



async function getArticleList () {
	return (await $get(BaseUrl + '/article/getArticleList')()) as Promise<[ArticleDetail]>
}
async function getArticleDetail (id: number) {
	return (await $get(BaseUrl + '/article/getArticleDetail')({ id })) as Promise<ArticleDetail>
}

export default {
	getArticleDetail,
	getArticleList
}
