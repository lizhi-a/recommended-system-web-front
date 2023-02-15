import { ProLayout } from '@ant-design/pro-components';
import React from 'react';
import { actions } from './common';

interface VideoLayoutProps {
  children?: React.ReactNode;
}
const VideoLayout: React.FC<VideoLayoutProps> = ({ children }) => {

  return (
    <ProLayout
      layout='top'
      logo={null}
      title="C语言入门第一课"
      actionsRender={actions}
      contentStyle={{
        minHeight: 'calc(100vh - 64px)',
        margin: 0, // umi4的坑，生产环境会在这个元素上加 margin-block: 24px；margin-inline: 40px; 导致出现横向滚动条
        paddingBlock: 0,
        paddingInline: 8,
      }}
    >
      {children}
    </ProLayout>
  )
}

export default VideoLayout;