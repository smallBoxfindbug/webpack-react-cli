/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-08-25 13:45:52
 * @LastEditTime: 2022-08-30 17:36:36
 * @Descripttion: file content
 */

import React, { useEffect, useState } from 'react'

import api from '@/api'
import renderMD from '@/utils/renderMD'
import './index.scss'

export default (props: { id: number }) => {
	const [ htmlStr, setHtmlStr ] = useState('')
	useEffect(() => {
		api.getArticleDetail(props.id).then((res) => setHtmlStr(renderMD(res.text)))
	}, [])
	useEffect(
		() => {
			const outline = document.querySelectorAll('.link')
			for (let index = 0; index < outline.length; index++) {
				const element = outline[index]
				element.addEventListener('click', (e: any) => {
					for (let i = 0; i < outline.length; i++) {
						const ev = outline[i] as any
						ev.style.fontWeight = '400'
					}
					e.target.style.fontWeight = '600'
				})
			}
		},
		[ htmlStr ]
	)
	return (
		<div className="markdown-detail">
			<div className="article-content markdown-body" dangerouslySetInnerHTML={{ __html: htmlStr }} />
		</div>
	)
}
