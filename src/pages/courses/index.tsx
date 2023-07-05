import { useCourses } from '@/hooks/queries';
import { Divider, Input, Pagination, Space } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useEffect, useState } from 'react';
import CourseCard from './components/CourseCard';
import SkeletonCard from '@/components/SkeletonCard';
import { CoursesType } from '@/constants';

interface DashboardProps {

}
const Dashboard: React.FC<DashboardProps> = (props) => {
  const [searchText, setSearchText] = useState<string>()
  const [currentPage, setCurrentPage] = useState(1)
  const [type, setType] = useState<string>()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [data, { refetch, isLoading, isError }] = useCourses({ cName: searchText, type, uid: user.id, page: currentPage })
  const totalElements = data?.totalElements || 0

  const handleSearchChange: SearchProps['onChange'] = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    refetch()
  }

  const handleLabelClick = (labelType: string) => {
    if (type === labelType) {
      setType('')
    }
    else {
      setType(labelType)
    }
  }

  useEffect(() => {
    refetch()
  }, [type, currentPage])

  return (
    <div className='flex mt-6 w-full'>
      <div className='w-2/12 p-4'>
        {
          Object.keys(CoursesType).map((key: string) => {
            return (
              <div className='mb-6' key={key}>
                <h3>{key}</h3>
                <Divider style={{ marginTop: 10, borderColor: 'lightgray' }} />
                <Space className='flex flex-wrap'>
                  {
                    CoursesType[key].map(item => (
                      <span
                        key={item}
                        className={type === item ?
                          'p-1 px-2 rounded-2xl bg-emerald-200 text-emerald-800' :
                          'p-1 px-2 rounded-2xl bg-gray-200'}
                        onClick={() => handleLabelClick(item)}
                      >
                        {item}
                      </span>
                    ))
                  }
                </Space>
              </div>
            )
          })
        }
      </div>
      <div className='w-10/12'>
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
    </div >
  )
}

export default Dashboard;
