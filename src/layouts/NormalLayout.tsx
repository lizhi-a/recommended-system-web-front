import React from 'react';
import Header from '@/components/Header';


interface NormalLayoutProps {
  children?: React.ReactNode;
  userInfo?: UserInfo;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children, userInfo }) => {
  return (
    <div className='min-h-screen'>
      <Header userInfo={userInfo} />
      <div className='container mx-auto '>
        {children}
      </div>
    </div>
  )
}

export default NormalLayout;
