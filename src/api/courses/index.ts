import callApi from "@/http/call-api";

// 首页所有课程
export const getCourses = ({ page, size}: PaginationRequest<{ name?: string; }>) => callApi.crypted<PaginationResponse<Course>>({
  url: '/api/v1/self/account/browse/course',
  params: { page, size },
  method: 'get',
})

// 首页我端所有课程-带进度
export const getMyCourses = ({ page, size}: PaginationRequest<{ name?: string; }>) => callApi.crypted<PaginationResponse<CourseDetail>>({
  url: '/api/v1/self/account/course/list',
  data: { page, size, progress: true },
  method: 'post',
})

// 查询我选择的课程的详情
export const getMyCourseDetail = (params: { id: string}) => callApi.crypted<CourseDetail>({
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