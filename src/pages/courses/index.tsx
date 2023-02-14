import { getCourses } from '@/api/courses';
import { useCourses } from '@/hooks/queries';
import { useQuery } from '@tanstack/react-query';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useState } from 'react';
import LoadingOrError from '@/components/LoadingOrError';
import CourseCard from './components/CourseCard';

interface DashboardProps {

}
const Dashboard: React.FC<DashboardProps> = (props) => {
  const [searchText, setSearchText] = useState<string>();
  const [courses, { refetch, isLoading }] = useCourses(searchText);
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
        isLoading ? <LoadingOrError /> : (
          <section className='flex justify-start flex-wrap'>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                <CourseCard
                  key={v}
                  course={{
                    chapters: [],
                    cover: 'https://static.runoob.com/images/demo/demo2.jpg',
                    createAt: '',
                    description: '',
                    id: '1',
                    name: 'C语言',
                    orgName: '计算机学院',
                    updateAt: '',
                  }}
                />
              ))
            }
          </section>
        )
      }
    </div>
  )
}

export default Dashboard;
