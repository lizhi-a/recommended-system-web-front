import { lazy } from 'react'

export type MenuRoute = {
	path: string
	name?: string
	icon?: React.ReactNode | string
	component?: React.LazyExoticComponent<React.FC>
	hideInMenu?: boolean
	routes?: MenuRoute[]
  redirect?: string;
}

export const routes: MenuRoute[] = [
  {
    path: '/',
    redirect: '/courses'
  },
	{
		path: '/courses',
		name: '首页',
		component: lazy(() => import('@/pages/courses')),
	},
  {
    path: '/courses/detail/:id',
    name: '课程详情',
    component: lazy(() => import('@/pages/courses/[id]')),
    hideInMenu: true,
  },
  {
    path: '/my-courses',
    name: '我的课程',
    component: lazy(() => import('@/pages/my-courses')),
  },
  {
    path: '/video/:vid',
    name: '视频demo',
    component: lazy(() => import('@/pages/video')),
    hideInMenu: true,
  },
  {
    path: '/login',
    component: lazy(() => import('@/pages/login')),
    hideInMenu: true,
  }
]