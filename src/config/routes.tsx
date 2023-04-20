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
    name: '全部课程',
    component: lazy(() => import('@/pages/courses')),
  },
  {
    path: '/course-detail/:id',
    name: '课程详情',
    component: lazy(() => import('@/pages/courses/[id]')),
    hideInMenu: true,
  },
  {
    path: '/recommend-courses',
    name: '课程推荐',
    component: lazy(() => import('@/pages/recommend-courses'))
  },
  {
    path: '/interactive-mode-recommend-courses',
    name: '基于交互模式的课程推荐',
    component: lazy(() => import('@/pages/interactive-recommend-courses'))
  },
  {
    path: '/self-test',
    name: '能力自测',
    component: lazy(() => import('@/pages/self-test'))
  },
  {
    path: '/self-test/:type',
    name: '能力自测',
    component: lazy(() => import('@/pages/self-test/[type]'))
  },
  {
    path: '/my-courses',
    name: '我的课程',
    component: lazy(() => import('@/pages/my-courses')),
  },
  {
    path: '/video/:courseId/:catalogId',
    name: '视频demo',
    component: lazy(() => import('@/pages/video')),
    hideInMenu: true,
  },
  {
    name: '系统设置',
    path: '/system',
    redirect: '/system/personal-imformation',
  },
  {
    name: '个人信息',
    path: '/system/personal-imformation',
    component: lazy(() => import('@/pages/system/personal-information')),
  },
  {
    name: '修改密码',
    path: '/system/update-password',
    component: lazy(() => import('@/pages/system/update-password')),
  },
  {
    path: '/login',
    component: lazy(() => import('@/pages/login')),
    hideInMenu: true,
  },
]