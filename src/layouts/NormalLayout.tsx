import { ProLayout } from '@ant-design/pro-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileDropDown } from './common';
import { routes } from '@/config/routes'
import Copyright from '@/components/Copyright';
import Footer from '@/components/Footer';


interface NormalLayoutProps {
  children?: React.ReactNode;
  userInfo?: UserInfo;
}
const NormalLayout: React.FC<NormalLayoutProps> = ({ children, userInfo }) => {

  return (
    <div
			id='pro-layout'
			style={{
				height: '100vh'
			}}
		>
			<ProLayout
				layout='top'
        logo="/logo.png"
        title="在线点播学习中心"
        fixedHeader
        contentStyle={{
          minHeight: 'calc(100vh - 64px)',
          margin: 0, // umi4的坑，生产环境会在这个元素上加 margin-block: 24px；margin-inline: 40px; 导致出现横向滚动条
          paddingBlock: 0,
          paddingInline: 8,
        }}
				actionsRender={() =>[ <ProfileDropDown userInfo={userInfo} />]}
				menuItemRender={(item, dom) => (
					<Link
						to={item.path ?? '/'}
					>
						{dom}
					</Link>
				)}
        route={{ routes }}
        footerRender={Footer}
			>
        {
          <div className='container mx-auto min-h-screen'>{children}</div>
        }
			</ProLayout>
		</div>
  )
}

export default NormalLayout;
