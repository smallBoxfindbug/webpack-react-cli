/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-08-30 10:54:45
 * @LastEditTime: 2022-08-30 17:36:48
 * @Descripttion: file content
 */

import React from 'react'

import Footer from '../Footer'
import Header from '../Header'

export default (props: any) => {
	return (
		<React.Fragment>
			<Header />
			{props.children}
			<Footer />
		</React.Fragment>
	)
}
