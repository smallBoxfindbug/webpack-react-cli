/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2021-11-25 15:35:57
 * @LastEditTime: 2021-12-01 14:15:00
 * @Descripttion: file content
 */

export function verifyPhone(val: string) {
	if (!/^1[3456789]\d{9}$/.test(val)) {
		return false;
	}
	return true;
}