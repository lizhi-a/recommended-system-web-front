import { getCourses, getMyCourseDetail, getMyCourses } from "@/api/courses";
import { me } from "@/api/login";
import { useQuery } from "@tanstack/react-query";


export interface CommonOption<D = unknown> {
  onSuccess?: (data?: D) => void;
  onError?: () => void;
}

// 首页所有课程
export function useCourses(searchText?: string, page: number = 1) {
  const { data, ...rest} = useQuery(['getCourses', page], () => getCourses({ name: searchText, page: page - 1 }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取个人信息
export function useMe() {
  const { data, ...rest} = useQuery(['getMe'], () => me(), {
    refetchOnWindowFocus: false,
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

// 获取我已经注册的课程的详情
export function useMyCourseDetail(id?: string, options?: CommonOption<CourseDetail>) {
  const { data, ...rest} = useQuery(['getMyCourseDetail', id], () => getMyCourseDetail({ id } as { id: string}), {
    refetchOnWindowFocus: false,
    onSuccess(data) {
      options?.onSuccess?.(data?.data)
    },
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}

export function useMyCourses(searchText?: string, page: number = 1) {
  const { data, ...rest} = useQuery(['getMyCourses', page], () => getMyCourses({ name: searchText, page: page - 1, size: 20 }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data;
  return [res, rest] as [typeof res, typeof rest];
}