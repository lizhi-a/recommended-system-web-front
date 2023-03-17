import callApi from "@/http/call-api";

export const updatePassword = (params: UpdatePasswordParams.Update & { id: number }) => callApi({
  url: '/api/user/updatePwd',
  method: 'post',
  data: params,
});