import callApi from "@/http/call-api";

// 首页所有课程
export const getUserInfo = (params: { id: number }) => callApi<UserData.User>({
  url: '/api/user/find',
  method: 'get',
  params,
})

export const updateUserInfo = (params: UserParams.Update) => callApi<UserData.User>({
  url: '/api/user/update',
  method: 'post',
  data: params,
})