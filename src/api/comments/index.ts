import callApi from "@/http/call-api";

// 首页所有课程
export const getComments = (params: PaginationRequest<CommentParams.Find>) =>
  callApi<PaginationResponse<CommentData.Comment>>({
    url: '/api/comments/find',
    method: 'get',
    params,
  })

export const addComment = (params: CommentParams.Add) => callApi({
  url: '/api/comments/add',
  method: 'post',
  data: params,
})