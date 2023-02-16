import { useMyCourses } from '@/hooks/queries';
import { findItemFormList } from '@/utils/common';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsCookie from 'js-cookie';
import './index.css'

interface VideoPageProps {

}
const VideoPage: React.FC<VideoPageProps> = (props) => {
  const playerRef = useRef<any>();
  const { catalogId, courseId } = useParams<{courseId: string; catalogId: string;}>()
  const [courseDetail] = useMyCourses(courseId);
  const targetCatlog = findItemFormList(courseDetail?.catalogs || [], 'id', catalogId);

  const initPlayer = () => {
    const resourceUrl = targetCatlog?.resourceUrl;
    if (resourceUrl) {
      const videoObject = {
        container: `#player`,//“#”代表容器的ID，“.”或“”代表容器的class
        video: targetCatlog?.resourceUrl,//视频地址
        cookie: catalogId,//cookie名称，在同一域中请保持唯一
        timeScheduleAdjust: 1, // timeScheduleAdjust: 5开启，会导致seek: cookie失效
      };
      playerRef.current = new window.ckplayer(videoObject);
    }
  }

  // 监听首次播放，跳转到对应进度
  const handleFirstPlay = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    setTimeout(() => {
      const ckid = targetCatlog?.id;
      if (ckid) {
        const lastPlayTimeCookie = jsCookie.get('ckplayer-player-cookie')
        const historyVideos = lastPlayTimeCookie?.split(',');
        if (historyVideos) {
          const currentHistoryVideo = historyVideos.find((item) => {
            return item.split(';')?.[0] === catalogId
          })
          const historySecond = currentHistoryVideo?.split(';')[1]
          player.seek(Number(historySecond) / 100);
        }
      }
      setTimeout(() => {
        player.vars('timeScheduleAdjust',5);
        player.removeListener('play', handleFirstPlay)
      }, 100)
    }, 100)
    
  }

  const addListeners = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    player.addListener('play', handleFirstPlay)
  }


  useEffect(() => {
    // 开发模式下 StrictMode会让useEffect执行两次 ！！！
    if (targetCatlog) {
      initPlayer();
      addListeners();
    }
  }, [targetCatlog])
  return (
    <div className='w-full min-h-full'>
      <div
        id="player"
      />
    </div>
  )
}

export default VideoPage;
