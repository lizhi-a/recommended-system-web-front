import { getCourseDependence, getCourseDetail, getCourseLastRecord, getCourseQuestions, getCourses, getMyCourses, getPathCourse, getRecommendCourses } from "@/api/courses";
import { me } from "@/api/login";
import { getAllQuestionsType, getQuestionsByType, getUserQuestionsListAndScore } from "@/api/questions";
import { getUserInfo } from "@/api/system";
import { useQuery } from "@tanstack/react-query";


export interface CommonOption<D = unknown> {
  onSuccess?: (data?: D) => void;
  onError?: () => void;
}

// 首页所有课程
export function useCourses({ uid, cName, type, page = 1 }: PaginationRequest<CourseParams.GetRecommendCoursesParams>) {
  const { data, ...rest } = useQuery(['getCourses', page],
    () => getRecommendCourses({ uid, cName, type, page, size: 20 }),
    {
      refetchOnWindowFocus: false
    })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

// 我的课程
export function useMyCourses(id: number, page: number = 1) {
  const { data, ...rest } = useQuery(['getMyCourses', page], () => getMyCourses({ id, page, size: 20 }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

export function useUserInfo(params: { id: number }) {
  const { data, ...rest } = useQuery(['getUserInfo'], () => getUserInfo(params), {
    refetchOnWindowFocus: false,
    enabled: !!params.id
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}



// 获取个人信息
export function useMe({ enabled = true }) {
  const { data, ...rest } = useQuery(['getMe'], () => me(), {
    refetchOnWindowFocus: false,
    enabled
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取我已经注册的课程的详情
export function useCourseDetail(id?: string, options?: CommonOption<CourseDetail>) {
  const { data, ...rest } = useQuery(['getCourseDetail', id, location.pathname], () => getCourseDetail({ id } as { id: string }), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onSuccess(data) {
      options?.onSuccess?.(data?.data)
    },
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取我已经注册的课程的详情
export function useCourseQuestions(cid?: string, options?: CommonOption<Question[]>) {
  const { data, ...rest } = useQuery(['getCourseQuestions', cid, location.pathname], () => getCourseQuestions({ cid } as { cid: string }), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onSuccess(data) {
      options?.onSuccess?.(data?.data.content)
    },
  })
  const res = data?.data.content;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取上次做题的记录、课程进度
export function useLastCourseRecord({ cid, uid }: { cid?: string; uid: number; }) {
  const { data, ...rest } = useQuery(['getMyCourses', cid, uid, location.pathname], () => getCourseLastRecord({ cid, uid }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

export function useMyCourseDetail() {
}

// 获取所有问题类型
export function useAllQuestionsType({ uid }: { uid: number }) {
  const { data, ...rest } = useQuery(['getAllQuestionsType', uid], () => getAllQuestionsType({ uid }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data.content;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取某个类型的题目
export function useQuestionsByType({ type, uid }: { type?: string; uid?: number; }) {
  const { data, ...rest } = useQuery(['getQuestionsByType', type, uid], () => getQuestionsByType({ type, uid }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data.content;
  const score = data?.data.score
  return [res, score, rest] as [typeof res, typeof score, typeof rest];
}

// 获取某个类型的题目
export function useUserQuestionsListAndScore({ uid }: { uid?: number; }) {
  const { data, ...rest } = useQuery(['getUserQuestionsListAndScore', uid], () => getUserQuestionsListAndScore({ uid }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data.content
  return [res, rest] as [typeof res, typeof rest];
}

// 获取推荐路径上的所有课程
export function usePathCourse({ uid }: { uid: number }) {
  const { data, ...rest } = useQuery(['getPathCourse', uid], () => getPathCourse({ uid }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data.content;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取推荐路径上的课程之间的依赖关系
export function useCourseDependence() {
  const { data, ...rest } = useQuery(['getCourseDependence'], () => getCourseDependence(), {
    refetchOnWindowFocus: false
  })
  const res = data?.data.content;
  return [res, rest] as [typeof res, typeof rest];
}