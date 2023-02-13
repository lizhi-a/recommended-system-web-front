import React, { useEffect } from 'react';

interface VideoPageProps {

}
const VideoPage: React.FC<VideoPageProps> = (props) => {

  useEffect(() => {
    const videoObject = {
      container: '.player',//“#”代表容器的ID，“.”或“”代表容器的class
      video:'http://ckplayer-video.oss-cn-shanghai.aliyuncs.com/sample-mp4/05cacb4e02f9d9e.mp4'//视频地址
    };
    const player = new window.ckplayer(videoObject);
  }, [])
  return (
    <div>
      <h3>ckplayer demo</h3>
      <div className='player w-4/5 h-96 mx-auto'></div>
    </div>
  )
}

export default VideoPage;
