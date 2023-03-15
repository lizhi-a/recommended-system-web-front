import { registerCourseForMe } from '@/api/courses';
import { useCourseDetail } from '@/hooks/queries';
import { Breadcrumb, Button, Image, Modal, Tabs } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterCard from './components/ChapterCard';
import courseImg from '@/assets/course.png'

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

  const handleClickChapter = async (chapter?: Catlog) => {
    if (courseId) {
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
      // 用户没有注册该课程，需要注册
      if (!myCourseDetail?.createAt) {
        await registerCourseForMe({
          id: courseId
        })
      }
      const catelogId = chapter?.id;
      if (catelogId) {
        navigate(`/video/${courseId}/${catelogId}`)
      } else {
        refetchMyCourseDetail();
      }
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
        <div className='flex flex-wrap lg:px-4 py-4'>
          <Box>
            <div className='w-full'>
              <Image width="100%" height={320} className="object-cover object-center" src={courseImg} preview={false} />
            </div>
          </Box>
          <Box className="md:">
            <div className='flex justify-between pt-6'>
              <h1 className='text-base font-medium m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>{myCourseDetail?.name}</h1>
              <div className='text-ant-text-secondary text-base'>开通单位：{myCourseDetail?.org}</div>
            </div>
            <div className='mt-8 mb-2 text-ant-text-secondary leading-7 text-base' style={{ minHeight: 128 }}>
              课程介绍：
              {myCourseDetail?.course_description}
            </div>
            <div className='md:absolute lg:absolute left-0 bottom-0'>
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

      <Tabs
        items={[
          {
            key: 'detail',
            label: `详情`,
            children: `Content of Tab Pane 1`,
          },
          {
            key: 'chapter',
            label: `章节`,
            children: `Content of Tab Pane 2`,
          },
        ]}
      />
      {/* {
        !!myCourseDetail?.createAt && (
          <div className='mt-2 flex-auto bg-white py-4'>
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
                      onClick={handleClickChapter}
                    />
                  ))
                )
              }
            </ul>
          </div>
        )
      } */}
    </div>
  )
}

export default CourseDetail;
