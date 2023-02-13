/* eslint-disable unicorn/no-keyword-prefix */
import { message, notification } from 'antd'
import type { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import qs from 'qs'
import getErrorMessage from './getErrorMessage'
import { removeToken } from './token'

type Methods = 'delete' | 'get' | 'option' | 'post' | 'put'
type ContentType = 'json' | 'multipart' | 'urlencoded'
const contentTypes = {
	json: 'application/json; charset=utf-8',
	urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
	multipart: 'multipart/form-data'
}
interface CallApiParameters<D = unknown> {
	url: string
	data?: D | string
	params?: Record<string, unknown>
	method?: Methods
	prefix?: string
	contentType?: ContentType
	options?: AxiosRequestConfig<D | string>
	withAuthorization?: boolean
	abortController?: AbortController
	commonErrorHandle?: boolean
}

axios.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (
			error.response?.status === 401 &&
			window.location.pathname !== '/login'
		) {
			sessionStorage.setItem('previous_url', window.location.pathname)
			removeToken()
			window.location.replace('/login')
			message.error('请重新登录')
			return new Promise(() => {})
		}
		return Promise.reject(error)
	}
)

/**
 *
 *
 * @template R 响应的类型
 * @template D 传参的类型
 * @param {CallApiParams<D>} {
 *   url = '',
 *   method = 'get',
 *   data,
 *   params,
 *   prefix = '',
 *   contentType = 'json',
 *   options = {},
 *   withAuthorization = true,
 *   abortController,
 * }
 * @return {AxiosPromise<R>}
 */
function callApi<R = unknown, D = unknown>({
	url = '',
	method = 'get',
	data,
	params,
	prefix = '',
	contentType = 'json',
	options = {},
	withAuthorization = true,
	abortController,
	commonErrorHandle = true
}: CallApiParameters<D>) {
	const newOptions = options
	const headers = options.headers ?? {
		'Content-Type': contentTypes[contentType]
	}
	newOptions.headers = headers
	if (withAuthorization) {
		const tk = localStorage.getItem('token')
		if (tk) {
			headers.Authorization = tk
		}
	}
	let newData: D | string
	if (data) {
		newData = data
		if (contentType === 'urlencoded') {
			newData = qs.stringify(data)
		}
		newOptions.data = newData
	}
	if (params && typeof params === 'object') {
		newOptions.params = params
		newOptions.paramsSerializer = {
			encode: p => qs.stringify(p, { arrayFormat: 'repeat' })
		}
	}
	if (abortController) {
		newOptions.signal = abortController.signal
	}
	const newOption: AxiosRequestConfig<D | string> = {
		url: `${prefix}${url}`,
		method,
		...newOptions
	}

	return new Promise((resolve, reject) => {
		axios(newOption)
			.then(responsive => {
				resolve(responsive)
			})
			.catch((error: AxiosError<Record<string, string>>) => {
				const errcode = error.response?.data?.code
				const messageString = getErrorMessage(
					errcode,
					error.response?.data?.description ??
						error.response?.data?.error_description ??
						error.response?.data?.message
				)
				if (messageString && commonErrorHandle) {
					notification.error({
						message: messageString
					})
				}
				reject(error)
			})
	}) as AxiosPromise<R>
}

export default callApi
