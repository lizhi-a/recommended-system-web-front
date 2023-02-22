import callApi from '@/http/call-api'

export const me = () =>
	callApi.crypted<UserInfo>({
    url: '/api/v1/self/account/info',
    method: 'post'
  })

  export const logout = (params: { userName: string; }) => callApi({
    url: '/api/v1/cas/logout',
    method: 'get',
    params: {
      ...params,
      state: 1,
    },
  })
