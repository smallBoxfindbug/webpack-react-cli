/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2022-08-30 10:18:38
 * @LastEditTime: 2022-08-30 10:18:53
 * @Descripttion: file content
 */
export function getParams (key: string, search?: string) {
	const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
	const r = (search || window.location.search).substr(1).match(reg)
	if (r != null) {
		return decodeURIComponent(r[2])
	}
	return null
}
