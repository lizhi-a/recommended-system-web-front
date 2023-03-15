import callApi from "@/http/call-api";

export const updatePassword = (params: UpdatePasswordParams.Update) => callApi({
  url: '/api/updatePwd',
  method: 'post',
  contentType: 'multipart',
  data: params,
});