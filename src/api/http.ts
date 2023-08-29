import axios from 'axios'
import qs from 'qs'

const createService = () => {
	const service = axios.create()
	service.defaults.paramsSerializer = function (params) {
		return qs.stringify(params, { arrayFormat: 'indices' })
	}
	service.defaults.timeout = 5000
	// service.defaults.withCredentials = true
	service.defaults.baseURL = '/'
	// service.defaults.headers.post['Content-Type'] = 'Access-Control-Allow-origin'
	service.defaults.transformRequest = [
		function (data) {
			if (data === null || data === undefined) return
			if (data.constructor.name.toLowerCase() === 'formdata') return data

			return qs.stringify(data)
		}
	]

	service.interceptors.response.use(
		({ data: { data, code, msg } }) => {
			if (code === 0) return data
			if (code === 40001) {
				return Promise.reject(data)
			}
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject({ code, msg, data })
		},
		(err) => {
			if (!navigator.onLine) err = { msg: '网络异常，请检查后重试' }
			return Promise.reject(err)
		}
	)
	return service
}

const NormalService = createService()
export const $get = <T>(url: any) => (params: any = null) => {
	return (NormalService({
		method: 'get',
		url,
		params
	}) as unknown) as Promise<T>
}
export const $post = <T>(url: any) => (data: any) => {
	return (NormalService({
		method: 'post',
		url,
		data
	}) as unknown) as Promise<T>
}
