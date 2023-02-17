import { useMyCourseDetail } from '@/hooks/queries';
import { findItemFormList, getProgress } from '@/utils/common';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'
import getVideoPlayTimeFromCookie from '@/utils/get-video-play-time-from-cookie';
import { globalContext } from '@/contexts/global';
import { useMutation } from '@tanstack/react-query';
import { reportFirstPlay, reportVideoPlay } from '@/api/courses';
import dayjs from 'dayjs';
import useInterval from '@/hooks/useInterval';

const REPORT_CYCLE_MS = 10000 // 上报周期
interface VideoPageProps {

}
const VideoPage: React.FC<VideoPageProps> = (props) => {
  const playerRef = useRef<any>(); // 播放器实例
  const [continuousReporting, setContinuousReporting] = useState(false); // 是否持续上报
  const maxProgressRef = useRef(0); // 播放过的最大进度，用途：用户将视频往左拖后，播放未达到这个进度就不进行上报
  const { catalogId, courseId } = useParams<{courseId: string; catalogId: string;}>()
  const [courseDetail, { refetch: refetchCourseDetail}] = useMyCourseDetail(courseId);

  // 查找播放的章节
  const targetCatlog = useMemo(() => {
    return findItemFormList(courseDetail?.catalogs || [], 'id', catalogId)
  }, [courseDetail]);

  const isStudyComplete = targetCatlog?.completeType === 'COMPLETED';

  const { dispatch } = useContext(globalContext)

  const reportMutation = useMutation(async (progress: number) => {
    if (catalogId && courseId) {
      return await reportVideoPlay({
        catalogId,
        courseId,
        progress: progress,
        reportTime: dayjs().format(),
      });
    }
  })

  // 或许我是第一次学习这个视频
  const mayBeFirstStudy = () => {
    if (!targetCatlog?.createAt) {
      if (catalogId && courseId)
      reportFirstPlay({
        catalogId,
        courseId
      })
    }
  }

  // 初始化播放器
  const initPlayer = () => {
    const resourceUrl = targetCatlog?.resourceUrl;
    const videoName = targetCatlog?.name;
    dispatch({
      type: 'setCurrentVideoName',
      payload: {
        currentVideoName: videoName
      }
    })
    if (resourceUrl) {
      const videoObject = {
        container: `#player`,//“#”代表容器的ID，“.”或“”代表容器的class
        video: targetCatlog?.resourceUrl,//视频地址
        cookie: catalogId,//cookie名称，在同一域中请保持唯一
        timeScheduleAdjust: 1, // timeScheduleAdjust: 5开启，会导致seek: cookie失效
        playbackrateOpen: false
      };
      playerRef.current = new window.ckplayer(videoObject);
    }
  }

  // 监听首次播放，跳转到对应进度,这个首次播放的意思是用户进入页面的首次播放，暂停后在播放就是二次播放
  const handleFirstPlay = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    setTimeout(() => {
    const ckPlayerRecords = player.cookie() as any[];
      maxProgressRef.current = targetCatlog?.progress || 0;
      const seekTimeInCookie = findItemFormList(ckPlayerRecords, 'name', targetCatlog?.id)?.time;
      const seekTimeInServer = (maxProgressRef.current / 100) * player.duration();
      let seekTime = seekTimeInCookie || seekTimeInServer || 0;
      // 上次播放时间存在 并且比（视频总时长 - 1秒）小，则跳转过去
      if (seekTime && seekTime < player.duration() - 1) {
        player.seek(seekTime)
      }
      setTimeout(() => {
        // 如果用户已经学习过了，可以随意拖动进度条
        const timeScheduleAdjust = isStudyComplete ? 1 : 5;
        player.vars('timeScheduleAdjust', timeScheduleAdjust);
        player.vars('playbackrateOpen', isStudyComplete);
        player.removeListener('play', handleFirstPlay)
      }, 100)
    }, 100)
  }

  // 监听视频播放，定期上报进度
  const handleVideoPlaying = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    const videoTotalTime = player.duration();
    const currentPlayTime = player.time();
    const prog = getProgress(currentPlayTime, videoTotalTime)
    if (prog > maxProgressRef.current) {
      maxProgressRef.current = prog
      reportMutation.mutate(prog)
    }
  }

  // 监听视频播放
  const handlePlay = () => {
    // 继续上报
    setContinuousReporting(true);
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
      refetchCourseDetail();
    })
  }


  // 设置监听器
  const addListeners = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    player.addListener('play', handleFirstPlay);
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
    player.removeListener('play', handleFirstPlay);
    player.removeListener('play', handlePlay);
    player.removeListener('pause', handlePause);
    player.removeListener('ended', handleEnd);
  }

  useInterval(handleVideoPlaying, REPORT_CYCLE_MS, (continuousReporting && !isStudyComplete))

  useEffect(() => {
    // 开发模式下 StrictMode会让useEffect执行两次 ！！！
    if (targetCatlog) {
      initPlayer();
      addListeners();
      mayBeFirstStudy();
    }
    return () => {
      removeAllListeners
    }
  }, [targetCatlog])
  return (
    <div className='w-full player-container'>
      <div
        id="player"
      />
    </div>
  )
}

export default VideoPage;
