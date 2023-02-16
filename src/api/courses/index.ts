import callApi from "@/http/call-api";

// 首页所有课程
export const getCourses = ({ page, size}: PaginationRequest<{ name?: string; }>) => callApi.crypted<PaginationResponse<Course>>({
  url: '/api/v1/self/account/browse/course',
  params: { page, size },
  method: 'get',
})

// 查询我选择的课程的详情
export const getMyCourses = (params: { id: string}) => callApi.crypted<CourseDetail>({
  url: '/api/v1/self/account/course/detail',
  data: {
    courseId: params.id
  },
  method: 'post'
})

// 给自己注册一个课程
export const registerCourseForMe = (params: Pick<Course, 'id'>) => callApi.crypted({
  url: '/api/v1/self/account/update/registerCourse',
  data: {
    courseId: params.id
  },
  method: 'post',
})