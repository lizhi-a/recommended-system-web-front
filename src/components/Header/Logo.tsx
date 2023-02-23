import React from 'react';

interface LogoProps {

}
const Logo: React.FC<LogoProps> = (props) => {

  return (
    <div className='flex items-center'>
      <div className='w-44 h-12 mr-4 block'>
        <img src="/logo.png" className='w-full h-full object-cover object-center' />
      </div>
      <span className='text-white text-lg font-medium hidden sm:hidden md:block'>在线点播学习中心</span>
    </div>
  )
}

export default Logo;
