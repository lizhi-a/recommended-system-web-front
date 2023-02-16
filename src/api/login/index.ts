import callApi from '@/http/call-api'

export const me = () =>
	callApi.crypted<UserInfo>({
    url: '/api/v1/self/account/info',
    method: 'post'
  })
