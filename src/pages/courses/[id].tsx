import { registerCourseForMe } from '@/api/courses';
import { useMyCourseDetail } from '@/hooks/queries';
import { Breadcrumb, Button, Image } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterCard from './components/ChapterCard';

const Box: React.FC<{ children?: React.ReactNode; className?: string; }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const CourseDetail: React.FC = () => {
  const { id: courseId } = useParams<{ id: string; }>();
  const [myCourseDetail, { refetch: refetchMyCourseDetail}] = useMyCourseDetail(courseId);
  const navigate = useNavigate();

  const handleRegisterCourse = async () => {
    if (courseId) {
      await registerCourseForMe({
        id: courseId
      })
      const catelogId = myCourseDetail?.catalogs?.[0]?.id;
      if (catelogId) {
        navigate(`/video/${courseId}/${catelogId}`)
      } else {
        refetchMyCourseDetail();
      }
    }
  }

  const handleContinueCourse = async () => {
    const catelogId = myCourseDetail?.catalogs?.[0]?.id;
    if (catelogId) {
      navigate(`/video/${courseId}/${catelogId}`)
    } else {
      refetchMyCourseDetail();
    }
  }
  return (
    <div>
      <div className='px-4 py-2 mt-6 bg-white'>
        <Breadcrumb>
          <Breadcrumb.Item href='/courses'>首页</Breadcrumb.Item>
          <Breadcrumb.Item>{myCourseDetail?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex flex-wrap lg:px-4 py-4'>
          <Box>
            <div className='w-full'>
              <Image width="100%" height={320} className="object-cover object-center" src={myCourseDetail?.coverUrl} preview={false} />
            </div>
          </Box>
          <Box className="md:">
            <div className='flex justify-between pt-6'>
              <h1 className='text-base font-medium m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>{myCourseDetail?.name}</h1>
              <div className='text-ant-text-secondary text-base'>开通组织：{myCourseDetail?.orgName}</div>
            </div>
            <div className='mt-8 mb-2 text-ant-text-secondary leading-7 text-base' style={{ minHeight: 128 }}>
              课程介绍：
              { myCourseDetail?.description }
            </div>
            <div className='md:absolute lg:absolute left-0 bottom-0'>
              {
                myCourseDetail?.createAt ? (
                  <Button size='large' type='primary' onClick={handleContinueCourse}>继续学习</Button>
                ) : (
                  <Button size='large' type='primary' onClick={handleRegisterCourse}>开始学习</Button>
                )
              }
            </div>
          </Box>
        </div>
      </div>
      
      <div className='mt-2 bg-white py-4'>
        <h2 className='ml-4 my-0 font-medium text-base'>课程章节</h2>
        <ul className='list-none my-0 p-0 mx-auto w-full sm:w-full md:w-2/3'>
          {
            courseId && (
              myCourseDetail?.catalogs?.map((item, index) => (
                <ChapterCard
                  chapter={item}
                  index={index}
                  key={item.id}
                  courseId={courseId}
                />
              )) 
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default CourseDetail;
