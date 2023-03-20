import SkeletonCard from '@/components/SkeletonCard';
import { useMyCourses } from '@/hooks/queries';
import { Pagination } from 'antd';
import React, { useState } from 'react';
import MyCourseCard from './components/MyCourseCard';

const MyCourses: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [data, { isLoading, isError }] = useMyCourses(user?.id)
  const totalElements = data?.totalElements || 0;

  return (
    <div>
      <h1 className='pt-8 text-lg'>我的课程</h1>
      <section className='flex justify-start flex-wrap'>
        {
          (isLoading || isError) ? (
            [1, 2, 3, 4].map((v) => <SkeletonCard key={v} />)
          ) : (
            data?.content?.map((item) => (
              <MyCourseCard
                key={item.id}
                course={item}
              />
            ))
          )
        }
      </section>
      <div className='w-full flex justify-center'>
        <Pagination
          showSizeChanger={false}
          pageSize={20}
          current={currentPage}
          total={totalElements}
          onChange={(page) => setCurrentPage(page)}
          size="small"
        />
      </div>
    </div>
  )
}

export default MyCourses;
