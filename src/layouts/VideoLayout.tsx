import Copyright from '@/components/Copyright';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileDropDown from '@/components/Header/ProfileDropDown';
import { globalContext, useGlobal } from '@/contexts/global';
import { ArrowLeftOutlined, LeftOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface VideoLayoutProps {
  children?: React.ReactNode;
  userInfo?: UserInfo;
}
const VideoLayout: React.FC<VideoLayoutProps> = ({ children, userInfo }) => {
  const { currentVideo } = useContext(globalContext)
  const navigate = useNavigate();
  const handleClickBack = () => {
    const courseId = currentVideo?.courseId;
    if (courseId) {
      navigate(`/course-detail/${courseId}`, {
        replace: true,
      })
    }
  }
  return (
    <div className='min-h-screen'>
      <header className='w-screen h-16 items-center justify-between bg-blue-400 px-6 flex'>
        <div className='text-lg font-medium text-white'>
          <ArrowLeftOutlined className='mr-2 cursor-pointer' onClick={handleClickBack} />
          <span>{currentVideo?.name}</span>
        </div>
        <ProfileDropDown userInfo={userInfo} />
      </header>
      {children}
    </div>
  )
}

export default VideoLayout;


