import { MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ProfileDropDown from './ProfileDropDown';

interface HeaderProps {
  userInfo?: UserData.User;
}
const Header: React.FC<HeaderProps> = ({ userInfo }) => {
  const [pathname, setPathname] = useState(location.pathname);
  const navigate = useNavigate();
  return (
    <>
      <header className='w-full h-16 items-center bg-emerald-500 px-6 hidden md:flex' >
        <h2 className='text-white m-0 cursor-pointer' onClick={() => navigate('/')}>个性化学习资源推荐系统</h2>
        <div className='w-16 sm:w-16 md:w-16 lg:w-auto flex-1'>
          <Menu
            className=' text-white border-0'
            style={{ backgroundColor: '#ffffff00' }}
            items={[
              { label: <div className='text-white'>全部课程</div>, key: '/courses' },
              // { label: <div className='text-white'>课程推荐</div>, key: '/recommend-courses' },
              { label: <div className='text-white'>个性化课程推荐</div>, key: '/interactive-mode-recommend-courses' },
              { label: <div className='text-white'>我的课程</div>, key: '/my-courses' },
              { label: <div className='text-white'>能力自测</div>, key: '/self-test' },
            ]}
            onClick={({ key }) => {
              navigate(key || '/')
              setPathname(key || '/')
            }}
            selectedKeys={[pathname]}
            mode="horizontal"
          />
        </div>
        <ProfileDropDown userInfo={userInfo} />
      </header>
      <header className='w-screen h-16 items-center bg-blue-400 px-1 flex md:hidden' style={{ backgroundImage: 'url("/images/header-bg.png")' }}>
        <div className='w-16 sm:w-16 md:w-16 lg:w-auto'>
          <Menu
            className='text-white border-0'
            style={{ backgroundColor: '#ffffff00' }}
            items={[
              {
                icon: <MenuOutlined className='text-white' />,
                key: '/',
                children: [
                  { label: <div>首页</div>, key: '/courses' },
                  { label: <div>我的课程</div>, key: '/my-courses' },
                  { label: <div>我的评价</div>, key: '/my-comments' }
                ]
              },
            ]}
            onClick={({ key }) => {
              navigate(key || '/')
              setPathname(key || '/')
            }}
            selectedKeys={[pathname]}
            mode="horizontal"
          />
        </div>
        <Logo />
        <ProfileDropDown userInfo={userInfo} />
      </header>
    </>
  )
}

export default Header;
