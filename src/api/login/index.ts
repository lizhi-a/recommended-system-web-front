import callApi from '@/http/callApi'
import { Credentials, LoginDetails, UserInfo } from './types'

export const login = (parameters: Credentials) =>
	callApi<LoginDetails>({
		url: '/api/v1/login',
		method: 'post',
		withAuthorization: false,
		data: parameters
	})

export const me = () =>
	callApi<UserInfo>({
		url: '/api/v1/me',
		method: 'get'
	})
