import React from 'react';
import Header from '@/components/Header';


interface NormalLayoutProps {
  children?: React.ReactNode;
  userInfo?: UserData.User;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children, userInfo }) => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Header userInfo={userInfo} />
      <div className='w-full m-0 p-6' style={{ height: 'calc(100vh - 64px)' }}>
        {children}
      </div>
    </div>
  )
}

export default NormalLayout;
