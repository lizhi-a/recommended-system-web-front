import { routes } from '@/config/routes'
import { removeToken } from '@/http/token'
import { PoweroffOutlined, } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Dropdown, Space } from 'antd'
import type React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


interface LayoutProperties {
	children?: React.ReactNode
}

const blankPagePath = new Set(['/login', '/cas'])

export const Layout: React.FC<LayoutProperties> = ({ children }) => {
	const [pathname, setPathname] = useState('/courses')
	const location = useLocation()
	if (blankPagePath.has(location.pathname)) {
		return (
			<div
				id='test-pro-layout'
				style={{
					height: '100vh'
				}}
			>
				{children}
			</div>
		)
	}
	return (
		<div
			id='test-pro-layout'
			style={{
				height: '100vh'
			}}
		>
			<ProLayout
				siderWidth={216}
				layout='top'
        title="vdp"
				fixSiderbar
        contentStyle={{
          minHeight: 'calc(100vh - 64px)',
          margin: 0, // umi4的坑，生产环境会在这个元素上加 margin-block: 24px；margin-inline: 40px; 导致出现横向滚动条
          paddingBlock: 0,
          paddingInline: 8,
        }}
				location={{
					pathname
				}}
				actionsRender={properties => {
					if (properties.isMobile) return []
					return [
						<Dropdown
							key='avatar'
							menu={{
								items: [
									{
										label: '退出登录',
										onClick: () => {
                      removeToken();
                      window.location.replace('/login')
                    },
										key: 'logout',
										icon: <PoweroffOutlined />
									}
								]
							}}
						>
							<Space>
								<span>username</span>
							</Space>
						</Dropdown>
					]
				}}
				menuItemRender={(item, dom) => (
					<Link
						to={item.path ?? '/'}
						onClick={() => {
							setPathname(item.path ?? '/courses')
						}}
					>
						{dom}
					</Link>
				)}
        route={{ routes }}
			>
        <div className='container mx-auto min-h-screen'>{children}</div>
			</ProLayout>
		</div>
	)
}

Layout.defaultProps = {
	children: undefined
}

export default Layout
