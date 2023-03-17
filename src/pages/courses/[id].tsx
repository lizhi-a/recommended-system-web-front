import { registerCourseForMe } from '@/api/courses';
import { useCourseDetail } from '@/hooks/queries';
import { Breadcrumb, Button, Image, Modal, Rate, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseImg from '@/assets/course.png'
import CourseDescriptionMsg from './components/CourseDescriptionMsg';
import DescriptionItem from '@/components/DescriptionItem';

const Box: React.FC<{ children?: React.ReactNode; className?: string; }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const FORMAT_STR = 'YYYY-MM-DD HH:mm'

const CourseDetail: React.FC = () => {
  const { id: courseId } = useParams<{ id: string; }>();
  const [myCourseDetail, { refetch: refetchMyCourseDetail }] = useCourseDetail(courseId);
  const navigate = useNavigate();


  const handleRegisterCourse = async () => {
    const selfRegisterable = false;
    const now = dayjs();
    const startTime = dayjs(myCourseDetail?.startTime);
    const entTime = dayjs(myCourseDetail?.endTime);
    if (now.isBefore(startTime) || now.isAfter(entTime)) {
      Modal.info({
        title: <div><p>本课程开课时间为：</p><p>{startTime.format(FORMAT_STR)}~{entTime.format(FORMAT_STR)}</p></div>,
        okText: '我知道了',
      })
      return
    }
    if (!selfRegisterable) {
      Modal.info({
        title: '本课程暂未开放自助选课，请联系老师',
        okText: '我知道了',
      })
      return
    } else if (!myCourseDetail?.createAt) {
      Modal.confirm({
        title: `要开始学习${myCourseDetail?.name || ''}`,
        async onOk() {
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
        },
        okText: '确认',
        cancelText: '取消'
      })
    }
  }

  const handleContinueCourse = async () => {
    const now = dayjs();
    const startTime = dayjs(myCourseDetail?.startTime);
    const entTime = dayjs(myCourseDetail?.endTime);
    if (now.isBefore(startTime) || now.isAfter(entTime)) {
      Modal.info({
        title: <div><p>本课程开课时间为：</p><p>{startTime.format(FORMAT_STR)}~{entTime.format(FORMAT_STR)}</p></div>,
        okText: '我知道了',
      })
      return
    }
    let catelogId = myCourseDetail?.catalogs?.[0]?.id;
    const targetCatalog = myCourseDetail?.catalogs?.find((item) => !item.progress || item.progress < 100);
    if (targetCatalog) {
      catelogId = targetCatalog.id;
    }
    if (catelogId) {
      navigate(`/video/${courseId}/${catelogId}`)
    } else {
      refetchMyCourseDetail();
    }
  }

  useEffect(() => {
    refetchMyCourseDetail();
  }, [])

  return (
    <div className='h-full flex flex-col'>
      <div className='px-4 py-2 mt-6 bg-white'>
        <Breadcrumb>
          <Breadcrumb.Item href='/courses'>首页</Breadcrumb.Item>
          <Breadcrumb.Item>{myCourseDetail?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex flex-wrap lg:px-4 my-4'>
          <Box>
            <div className='w-full'>
              <Image width="100%" height={320} className="object-cover object-center" src={courseImg} preview={false} />
            </div>
          </Box>
          <Box className="md:">
            <div className='flex justify-between mb-2'>
              <h2 className='m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>{myCourseDetail?.name}</h2>
              <div className='text-ant-text-secondary text-base'>开通单位：{myCourseDetail?.org}</div>
            </div>
            <div className='text-ant-text-secondary leading-7 text-base' style={{ minHeight: 128 }}>
              <span className='text-gray-600'>课程介绍：</span>
              {myCourseDetail?.course_description}
            </div>
            <div className='text-ant-text-secondary leading-7 text-base'>
              <span className='text-gray-600'>课程类别：</span>
              <Tag color="cyan">{myCourseDetail?.type}</Tag>
            </div>
            <div className='text-ant-text-secondary leading-7 text-base'>
              <span className='text-gray-600'>课程评分：</span>
              <Rate disabled allowHalf value={myCourseDetail?.score} /> {myCourseDetail?.score ? `${myCourseDetail?.score}分` : '暂无评分'}
            </div>
            <div className='absolute left-0 bottom-0'>
              {
                myCourseDetail?.startAt ? (
                  <Button size='large' type='primary' onClick={handleContinueCourse}>继续学习</Button>
                ) : (
                  <Button size='large' type='primary' onClick={handleRegisterCourse}>开始学习</Button>
                )
              }
            </div>
          </Box>
        </div>
      </div>
      {
        myCourseDetail && (
          <Tabs
            items={[
              {
                key: 'detail',
                label: `详情`,
                children: <CourseDescriptionMsg courseDetail={myCourseDetail} />,
              },
              {
                key: 'chapter',
                label: `课程大纲`,
                children: (
                  <DescriptionItem title="课程大纲">
                    {
                      myCourseDetail.course_catalogue?.split('#').map(item => {
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
