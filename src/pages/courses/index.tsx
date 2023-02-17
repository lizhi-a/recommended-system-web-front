import { useCourses } from '@/hooks/queries';
import { Input, Pagination } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useState } from 'react';
import LoadingOrError from '@/components/LoadingOrError';
import CourseCard from './components/CourseCard';
import SkeletonCard from '@/components/SkeletonCard';

interface DashboardProps {

}
const Dashboard: React.FC<DashboardProps> = (props) => {
  const [searchText, setSearchText] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, { refetch, isLoading, isError }] = useCourses(searchText, currentPage);
  const totalElements = data?.totalElements || 0;

  const handleSearchChange: SearchProps['onChange'] = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    refetch();
  }
  return (
    <div className='mt-6'>
      <div className='w-full mx-auto sm:w-full md:w-2/3 lg:w-1/2 mb-16'>
        <Input.Search
          enterButton
          value={searchText}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="搜索感兴趣的课程"
        />
      </div>
      {
          <section className='flex justify-start flex-wrap'>
            {
              (isLoading || isError) ? (
                [1, 2, 3, 4].map((v) => <SkeletonCard key={v} />)
              ) : (
                data?.content?.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))
              )
            }
          </section>
      }
      <div className='w-full flex justify-end'>
        <Pagination
          showSizeChanger={false}
          pageSize={20}
          current={currentPage}
          total={totalElements}
          onChange={(page) => {() => setCurrentPage(page) }}
          size="small"
        />
      </div>
    </div>
  )
}

export default Dashboard;
