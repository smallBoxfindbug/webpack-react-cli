/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-08-22 17:08:03
 * @LastEditTime: 2022-08-30 17:36:19
 * @Descripttion: file content
 */
import React, { useEffect, useState } from 'react'

import useLocation from '@/hooks/useLocation'
import Layout from '@/components/Layout'
import api from '@/api'
import './app.scss'

interface Article {
	'id': number
	'text': string
	'keyword': string
	'title': string
	'author': string
	'date': string
	'subtitle': string
	'column': string
}

export default () => {
	const [ data, setData ] = useState<Array<Article>>([])
	const location = useLocation()
	useEffect(() => {
		api.getArticleList().then((res) => {
			setData(res)
		})
	}, [])

	const formatDate = (date: string) => {
		const time = new Date(date)
		return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
	}
	const linkDetail = (id: number) => {
		return () => {
			location.href('/home.html?id=' + id)
		}
	}
	return (
		<Layout>
			<div className="list">
				<p className="list-title">推荐</p>
				{data.map(({id,author,date,column,title,subtitle}) => {
					return (
						<div className="list-item" key={id}>
							<div className="list-item-referral">
								<span>{author}</span>
								<span>{formatDate(date)}</span>
								<span>{column}</span>
							</div>
							<p className="list-item-title" onClick={linkDetail(id)}>
								{title}
							</p>
							<p className="list-item-subtitle">{subtitle}</p>
						</div>
					)
				})}
			</div>
		</Layout>
	)
}
