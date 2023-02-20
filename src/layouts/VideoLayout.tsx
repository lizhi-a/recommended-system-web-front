import { globalContext, useGlobal } from '@/contexts/global';
import { ArrowLeftOutlined, LeftOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileDropDown } from './common';

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
      navigate(`/courses/detail/${courseId}`)
    }
  }
  return (
    <ProLayout
      layout='top'
      logo={null}
      headerRender={false}
      actionsRender={() =>[ <ProfileDropDown userInfo={userInfo} />]}
      contentStyle={{
        minHeight: 'calc(100vh - 64px)',
        margin: 0, // umi4的坑，生产环境会在这个元素上加 margin-block: 24px；margin-inline: 40px; 导致出现横向滚动条
        paddingBlock: 0,
        paddingInline: 8,
      }}
    >
      <div className='w-full h-16 flex justify-between items-center px-4'>
        <div className='text-lg font-medium'>
          <ArrowLeftOutlined className='mr-2 cursor-pointer' onClick={handleClickBack} />
          <span>{currentVideo?.name}</span>
        </div>
        <div>
          <ProfileDropDown userInfo={userInfo} />
        </div>
      </div>
      {children}
    </ProLayout>
  )
}

export default VideoLayout;
