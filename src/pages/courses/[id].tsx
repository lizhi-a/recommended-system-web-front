import { registerCourseForMe } from '@/api/courses';
import { useCourseDetail, useMyCourses } from '@/hooks/queries';
import { Breadcrumb, Button, Image, Modal, notification, Rate, Tabs, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courseImg from '@/assets/course.png'
import CourseDescriptionMsg from './components/CourseDescriptionMsg';
import DescriptionItem from '@/components/DescriptionItem';

const Box: React.FC<{ children?: React.ReactNode; className?: string; }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const CourseDetail: React.FC = () => {
  const { id: courseId } = useParams<{ id: string; }>()
  const [courseDetail, { refetch: refetchcourseDetail }] = useCourseDetail(courseId)
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [myCourseList, { refetch: refetchMyCourseList }] = useMyCourses(user?.id)
  const handleRegisterCourse = async () => {
    Modal.confirm({
      title: `确定要开始学习${courseDetail?.name || ''}`,
      async onOk() {
        if (courseId && user?.id) {
          await registerCourseForMe({
            id: user?.id,
            courseId: courseId
          })
          notification.success({
            message: '选课成功'
          })
          refetchMyCourseList()
        }
      },
    })
  }

  useEffect(() => {
    refetchcourseDetail();
  }, [])

  return (
    <div className='h-full flex flex-col'>
      <div className='px-4 py-2 mt-6 bg-white'>
        <Breadcrumb>
          <Breadcrumb.Item href='/courses'>首页</Breadcrumb.Item>
          <Breadcrumb.Item>{courseDetail?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex flex-wrap lg:px-4 my-4'>
          <Box>
            <div className='w-full'>
              <Image width="100%" height={320} className="object-cover object-center" src={courseImg} preview={false} />
            </div>
          </Box>
          <Box className="md:">
            <div className='flex justify-between mb-2'>
              <h2 className='m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>{courseDetail?.name}</h2>
              <div className='text-ant-text-secondary text-base'>开通单位：{courseDetail?.org}</div>
            </div>
            <div className='text-ant-text-secondary leading-7 text-base' style={{ minHeight: 128 }}>
              <span className='text-gray-600'>课程介绍：</span>
              {courseDetail?.course_description || '暂无介绍'}
            </div>
            <div className='text-ant-text-secondary leading-7 text-base'>
              <span className='text-gray-600'>课程类别：</span>
              <Tag color="cyan">{courseDetail?.type || '无分类'}</Tag>
            </div>
            <div className='text-ant-text-secondary leading-7 text-base'>
              <span className='text-gray-600'>课程评分：</span>
              <Rate disabled allowHalf value={courseDetail?.score} /> {courseDetail?.score ? `${courseDetail?.score}分` : '暂无评分'}
            </div>
            <div className='absolute right-0 bottom-0'>
              {
                courseDetail && myCourseList?.content.map(item => item.id).includes(courseDetail?.id) ? (
                  <Button size='large' type='primary'>已选课</Button>
                ) : (
                  <Button size='large' type='primary' onClick={handleRegisterCourse}>开始学习</Button>
                )
              }
            </div>
          </Box>
        </div>
      </div>
      {
        courseDetail && (
          <Tabs
            className='bg-white'
            items={[
              {
                key: 'detail',
                label: `详情`,
                children: <CourseDescriptionMsg courseDetail={courseDetail} />,
              },
              {
                key: 'chapter',
                label: `课程大纲`,
                children: (
                  <DescriptionItem title="课程大纲">
                    {
                      courseDetail.course_catalogue?.split('#').map(item => {
                        return <p key={item} className="m-0">{item}</p>
                      })
                    }
                  </DescriptionItem>
                ),
              },
              {
                key: 'test question',
                label: `测试题`,
                children: '暂无测试题',
              },
            ]}
          />
        )
      }
    </div>
  )
}

export default CourseDetail;
