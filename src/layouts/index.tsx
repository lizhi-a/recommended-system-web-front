import type React from 'react'
import { useLocation } from 'react-router-dom'
import BlankLayout from './BlankLayout'
import VideoLayout from './VideoLayout'
import NormalLayout from './NormalLayout'


interface LayoutProperties {
	children?: React.ReactNode
}

const blankPagePath = new Set(['/login', '/cas'])

export const Layout: React.FC<LayoutProperties> = ({ children }) => {
	const location = useLocation()
	if (blankPagePath.has(location.pathname)) {
		return (
			<BlankLayout>{children}</BlankLayout>
		)
	}
  if (location.pathname.startsWith('/video')) {
    return (
      <VideoLayout>{children}</VideoLayout>
    )
  }
	return (
    <NormalLayout>{children}</NormalLayout>
	)
}

Layout.defaultProps = {
	children: undefined
}

export default Layout
