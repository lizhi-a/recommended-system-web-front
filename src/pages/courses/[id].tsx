import { registerCourseForMe, reportVideoPlay, submitTest } from '@/api/courses';
import { useCourseDetail, useMyCourses } from '@/hooks/queries';
import { Breadcrumb, Button, Modal, notification, Rate, Tabs, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseDescriptionMsg from './components/CourseDescriptionMsg';
import DescriptionItem from '@/components/DescriptionItem';
import Comments from './components/Comments';
import CourseQuestions from './components/CourseQuestions';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getProgress } from '@/utils/common';
import useInterval from '@/hooks/useInterval';

const Box: React.FC<{ children?: React.ReactNode; className?: string; }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const REPORT_CYCLE_MS = 2000 // 上报周期

const CourseDetail: React.FC = () => {
  const { id: courseId } = useParams<{ id: string; }>()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [courseDetail, { refetch: refetchcourseDetail }] = useCourseDetail(courseId)
  const [myCourseList, { refetch: refetchMyCourseList }] = useMyCourses(user?.id)
  const playerRef = useRef<any>(); // 播放器实例
  const [continuousReporting, setContinuousReporting] = useState(false); // 是否持续上报
  const maxProgressRef = useRef(0); // 播放过的最大进度，用途：用户将视频往左拖后，播放未达到这个进度就不进行上报

  const handleRegisterCourse = async () => {
    Modal.confirm({
      title: `确定要开始学习${courseDetail?.name || ''}`,
      async onOk() {
        if (courseId && user?.id) {
          registerCourseForMe({
            uid: user?.id,
            cid: courseId
          }).then(() => {
            refetchMyCourseList()
            notification.success({
              message: '选课成功'
            })
          })
        }
      },
    })
  }

  const handleSubmitTest = (values: Record<number, string>) => {
    if (courseId && user?.id) {
      return submitTest({
        cid: courseId,
        uid: user.id,
        questions: values
      })
    }
    return Promise.resolve()
  }

  // 初始化播放器
  const initPlayer = () => {
    if (courseDetail?.video) {
      const videoObject = {
        container: `#player`,//“#”代表容器的ID，“.”或“”代表容器的class
        video: `${courseDetail.video}`,//视频地址
        cookie: courseDetail.id,//cookie名称，在同一域中请保持唯一
        timeScheduleAdjust: 1, // timeScheduleAdjust: 5开启，会导致seek: cookie失效
        playbackrateOpen: false,
        autoplay: false,
      };
      playerRef.current = new window.ckplayer(videoObject);
    }
  }

  const reportMutation = useMutation(async (progress: number) => {
    if (courseId) {
      return await reportVideoPlay({
        cid: courseId,
        uid: user.id,
        progress: progress,
        reportTime: dayjs().format(),
      });
    }
  })
  // 监听视频播放，定期上报进度
  const handleVideoPlaying = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    const videoTotalTime = player.duration();
    const currentPlayTime = player.time();
    const progress = getProgress(currentPlayTime, videoTotalTime)

    if (progress > maxProgressRef.current) {
      maxProgressRef.current = progress
      reportMutation.mutate(progress)
    }
  }

  useInterval(handleVideoPlaying, REPORT_CYCLE_MS, (continuousReporting))

  // 监听视频播放
  const handlePlay = () => {
    if (courseDetail && myCourseList?.content.map(item => item.cid_id).includes(courseDetail?.id)) {
      // 继续上报
      setContinuousReporting(true);
    }
    else {
      playerRef.current.pause()
      notification.error({
        message: '请先选择课程',
        placement: 'topLeft'
      })
    }
  }

  // 监听视频暂停
  const handlePause = () => {
    // 暂停上报
    setContinuousReporting(false);
  }

  // 监听视频播放完
  const handleEnd = () => {
    // 暂停上报
    setContinuousReporting(false);
    maxProgressRef.current = 0;
    reportMutation.mutateAsync(100).then(() => {
      refetchcourseDetail()
      refetchMyCourseList()
      // refetchCourseDetail();
      // refetchMyCourses();
    })
  }

  // 设置监听器
  const addListeners = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    player.addListener('play', handlePlay);
    player.addListener('pause', handlePause);
    player.addListener('ended', handleEnd);
  }

  // 移除监听器
  const removeAllListeners = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    player.removeListener('play', handlePlay);
    player.removeListener('pause', handlePause);
    player.removeListener('ended', handleEnd);
  }

  useEffect(() => {
    refetchcourseDetail();
  }, [])

  useEffect(() => {
    // 开发模式下 StrictMode会让useEffect执行两次 ！！！
    if (courseDetail) {
      initPlayer();
      addListeners();
    }
    return () => {
      removeAllListeners
    }
  }, [courseDetail])

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
              {/* <Image width="100%" height={320} className="object-cover object-center" src={courseImg} preview={false} /> */}
              <div
                id="player"
                style={{ height: 320 }}
              />
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
                courseDetail && myCourseList?.content.map(item => item.cid_id).includes(courseDetail?.id) ? (
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
                key: 'comments',
                label: `评价`,
                children: <Comments />,
              },
              {
                key: 'chapter',
                label: `课程大纲`,
                children: (
                  <div className="w-11/12 my-6 m-auto">
                    <DescriptionItem title="课程大纲" >
                      {
                        courseDetail.course_catalogue?.split('#').map(item => {
                          return <p key={item} className="m-0">{item}</p>
                        })
                      }
                    </DescriptionItem>
                  </div>
                ),
              },
              {
                key: 'test question',
                label: `测试题`,
                children: <CourseQuestions onOk={handleSubmitTest} />,
              },
            ]}
          />
        )
      }
    </div>
  )
}

export default CourseDetail;
