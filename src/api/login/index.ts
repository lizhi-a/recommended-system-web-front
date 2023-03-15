import callApi from '@/http/call-api'

export const me = () => callApi<UserInfo>({
  url: '/api/login',
  method: 'post'
})

export const login = (params: { userName: string; password: string }) => callApi<loginType>({
  url: '/api/login',
  method: 'post',
  data: params,
  contentType: 'multipart',
})


export const logout = (params: { userName: string; }) => callApi({
  url: '/api/logout',
  method: 'get',
  params,
})
