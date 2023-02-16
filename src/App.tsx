import type { MenuRoute } from '@/config/routes'
import { routes } from '@/config/routes'
import { ReactElement, useEffect } from 'react'
import { Suspense } from 'react'
import { Navigate, RouteObject, useLocation, useNavigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import LoadingOrError from '@/components/LoadingOrError'
import Layout from './layouts'
import { getToken } from './http/token'

const withoutCheckLoginPath = ['/login', '/cas'];

function generateRouteConfig(menuRoutes: MenuRoute[]): RouteObject[] {
	const result: RouteObject[] = []
	for (const menuRouteItem of menuRoutes) {
		const routeObjectItem: RouteObject = {}
		routeObjectItem.path = menuRouteItem.path
    if (menuRouteItem.redirect) {
      routeObjectItem.element = <Navigate to={menuRouteItem.redirect} />
    } else if (menuRouteItem.component) {
      const Element = menuRouteItem.component
      routeObjectItem.element = (
        <Suspense fallback={<LoadingOrError />}>
          <Element />
        </Suspense>
      )
      if (menuRouteItem.routes) {
        routeObjectItem.children = generateRouteConfig(menuRouteItem.routes)
      }
    }
		result.push(routeObjectItem)
	}
	return result
}

export default function App(): ReactElement {
	const configs = generateRouteConfig(routes);
	const element = useRoutes(configs);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const isLogin = !!getToken();
    if (!isLogin && !withoutCheckLoginPath.includes(location.pathname)) {
      navigate('/login');
    }
  }, [location.pathname])
	return <Layout>{element}</Layout>
}
