```javascript

var videoObject = {
  container: '',//视频容器的ID
  volume: 0.8,//默认音量，范围0-1
  poster: '',//封面图片地址
  autoplay: false,//是否自动播放
  loop: false,//是否需要循环播放
  rotate:0,//视频旋转角度
  zoom:0,//默认缩放比例
  live: false,//是否是直播
  ad:null,//广告
  backLive:false,//显示返回直播按钮
  seek: 0,//默认需要跳转的秒数
  next: null,//下一集按钮动作
  loaded: '',//加载播放器后调用的函数
  plug:'',//使用插件，目前支持hls.js:用于在pc端播放m3u8，flv.js:播放flv，mpegts.js：播放ts
  duration:0,//如果强制使用点播，而视频里不存在总时间，可以手动指定
  preview: null,//预览图片对象
  prompt: null,//提示点功能
  crossOrigin:'',//发送跨域信息，示例：Anonymous
  video: null,//视频地址
  type:'',//视频类型
  playbackrate: 1,//默认倍速
  ended:null,//结束显示的内容
  webFull:false,//是否启用页面全屏按钮，默认不启用
  theatre:null,//是否启用剧场模式按钮，默认不启用
  controls:false,//是否显示自带控制栏
  rightBar:null,//是否开启右边控制栏
  smallWindows:null,//是否启用小窗口模式
  smallWindowsDrag:true,//小窗口开启时是否可以拖动
  screenshot:false,//截图功能是否开启
  timeScheduleAdjust:1,//是否可调节播放进度,0不启用，1是启用，2是只能前进（向右拖动），3是只能后退，4是只能前进但能回到第一次拖动时的位置，5是看过的地方可以随意拖动
  logo:'',//logo
  menu:null,//右键菜单
  information:{//关于
    'Load:':'{loadTime} second',
    'Duration:':'{duration} second',
    'Size:':'{videoWidth}x{videoHeight}',
    'Volume:':'{volume}%',
    'Sudio decoded:':'{audioDecodedByteCount} Byte',
    'Video decoded:':'{videoDecodedByteCount} Byte'
  },
  track:null,//字幕
  title:'',//视频标题
  language:'',//语言包文件
  barHideTime:1500,//控制栏隐藏时间
  playbackrateOpen:true,//是否开启控制栏倍速选项
  playbackrateList:[0.75,1,1.25,1.5,2,4],//倍速配置值
  cookie:null,//cookie名称，在同一域中请保持唯一
  domain:null,//cookie保存域
  cookiePath:'/',//cookie保存路径
  documentFocusPause:false,//窗口失去焦点后暂停播放
  mouseWheelVolume:2,//是否启用鼠标滚轮调节音量功能，0=不启用，1=启用，2=全屏时才启用
  keyVolume:2//是否启用键盘控制音量调节，0=不启用，1=启用，2=全屏时才启用
  };

```