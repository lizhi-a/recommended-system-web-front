import React, { useEffect, useRef } from 'react';

interface VideoPageProps {

}
const VideoPage: React.FC<VideoPageProps> = (props) => {
  const playerRef = useRef<any>();

  const initPlayer = () => {
    const videoObject = {
      container: `#player`,//“#”代表容器的ID，“.”或“”代表容器的class
      video:'http://192.168.15.105:9000/test-public/public/1_1920x1080.mp4',//视频地址
      cookie: 'ny',//cookie名称，在同一域中请保持唯一
      // autoplay: true,
      // seek: 'cookie',
      timeScheduleAdjust: 1, // timeScheduleAdjust: 5开启，会导致seek: cookie失效
    };
    playerRef.current = new window.ckplayer(videoObject);
  }

  // 监听首次播放，跳转到对应进度
  const handleFirstPlay = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    setTimeout(() => {
      player.seek(120)
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
    initPlayer();
    addListeners();
  }, [])
  return (
    <div>
      <h3>ckplayer demo</h3>
      <div
        id="player"
        className='w-4/5 mx-auto'
        style={{ height: 500 }}
      />
    </div>
  )
}

export default VideoPage;
