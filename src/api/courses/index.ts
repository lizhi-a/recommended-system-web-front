import callApi from "@/http/call-api";

// 首页所有课程
export const getCourses = (params: PaginationRequest<CourseParams.Find>) => callApi<PaginationResponse<Course>>({
  url: '/api/courses/find',
  method: 'get',
  params,
})

// 首页我的课程
export const getMyCourses = (params: PaginationRequest & { id: number }) => callApi<PaginationResponse<MyCourses>>({
  url: '/api/course/self/list',
  method: 'get',
  params,
})

// 查询我选择的课程的详情
export const getCourseDetail = (params: { id: string }) => callApi<CourseDetail>({
  url: '/api/course/detail',
  method: 'get',
  params,
})

// 给自己注册一个课程
export const registerCourseForMe = (params: { uid: number, cid: string }) => callApi({
  url: '/api/course/registerCourse',
  method: 'post',
  data: params,
})

// 获取课程评论
export const getCourseQuestions = (params: { cid: string }) => callApi<PaginationResponse<Question>>({
  url: '/api/course/questions',
  method: 'get',
  params,
})

// 提交测试题
export const submitTest = (params: CourseParams.SubmitTest) => callApi({
  url: '/api/course/submitTest',
  method: 'post',
  data: params
})

// 获取上次的做题记录
export const getCourseLastRecord = (params: { cid?: string, uid: number }) => callApi<CourseParams.myCourseRecord>({
  url: '/api/course/self/lastRecord',
  method: 'get',
  params,
})

// 上报视频播放
export const reportVideoPlay = (params: CourseParams.VideoRepoter) => callApi({
  url: '/api/course/self/report',
  data: params,
  method: 'post',
})

export const getRecommendCourses = (params: CourseParams.GetRecommendCoursesParams) => callApi<PaginationResponse<CourseDetail>>({
  url: '/api/course/recommend',
  method: 'get',
  params,
})

export const getInteractiveRecommendCourses = (params: {}) => callApi<PaginationResponse<CourseDetail>>({
  url: '/api/course/interactive-mode-recommend',
  method: 'get',
  params,
})

// 获取推荐路径上的所有课程
export const getPathCourse = (params: { uid: number }) => callApi<PaginationResponse<CoursePath>>({
  url: '/api/pathcourse/find',
  method: 'get',
  params,
})

// 获取推荐路径上的课程之间的依赖关系
export const getCourseDependence = () => callApi<PaginationResponse<CourseDependence>>({
  url: '/api/pathCourse/dependence',
  method: 'get',
})

// // 查询我选择的课程的详情
// export const getMyCourseDetail = (params: { id: string }) => callApi.crypted<CourseDetail>({
//   url: '/api/v1/self/account/course/detail',
//   data: {
//     courseId: params.id
//   },
//   method: 'post'
// })



// 当前播放的视频进度为0时，通知后端
export const reportFirstPlay = (params: Pick<CourseParams.VideoRepoter, 'cid'>) => callApi.crypted({
  url: '/api/v1/self/account/course/playVideo',
  data: params,
  method: 'post',
})
