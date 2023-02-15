// 空白布局
import React from 'react';

interface BlankLayoutProps {
  children?: React.ReactNode;
}
const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {

  return (
    <div
      className='h-screen'
    >
      {children}
    </div>
  )
}

export default BlankLayout;
