import { getCourses } from "@/api/courses";
import { useQuery } from "@tanstack/react-query";

export function useCourses(searchText?: string) {
  const { data, ...rest} = useQuery(['getCourses'], () => getCourses({ name: searchText }), {
    refetchOnWindowFocus: false
  })
  const res = data?.data || [];
  return [res, rest] as [typeof res, typeof rest];
}