/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-08-22 17:08:03
 * @LastEditTime: 2022-08-30 10:58:36
 * @Descripttion: file content
 */
import React from 'react'
import './app.scss'
import MarkdownDetail from '@/components/MarkdownDetail'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import useLocation from '@/hooks/useLocation'
import Layout from '@/components/Layout'

export default () => {
	const location = useLocation()
	return (
		<Layout>
			<MarkdownDetail id={Number(location.getSearch('id'))} />
		</Layout>
	)
}
