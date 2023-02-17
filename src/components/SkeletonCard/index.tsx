import { Skeleton, Space } from 'antd';
import React from 'react';

interface SkeletonCardProps {

}
const SkeletonCard: React.FC<SkeletonCardProps> = (props) => {

  return (
    <div className='w-full sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-3 flex' style={{ minHeight: 200 }}>
      <div className='flex-auto bg-white shadow-md rounded-lg overflow-hidden px-2'>
        <Skeleton />
      </div>
    </div>
  )
}

export default SkeletonCard;
