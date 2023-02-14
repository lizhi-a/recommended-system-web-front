import callApi from "@/http/call-api";

export const getCourses = (params: { name?: string }) => callApi.crypted<Course[]>({
  url: '/api/courses',
  params,
  method: 'get',
})