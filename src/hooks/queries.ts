import { getCourseDetail, getCourses, getMyCourses } from "@/api/courses";
import { me } from "@/api/login";
import { getUserInfo } from "@/api/system";
import { useQuery } from "@tanstack/react-query";


export interface CommonOption<D = unknown> {
  onSuccess?: (data?: D) => void;
  onError?: () => void;
}

// 首页所有课程
export function useCourses({ name, type, page = 1 }: PaginationRequest<CourseParams.Find>) {
  const { data, ...rest } = useQuery(['getCourses', page],
    () => getCourses({ name, type, page, size: 20 }),
    {
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
  console.log(data)
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

export function useMyCourses(searchText?: string, page: number = 1) {
  const { data, ...rest } = useQuery(['getMyCourses', page], () => getMyCourses({ name: searchText, page: page - 1, size: 20 }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}
