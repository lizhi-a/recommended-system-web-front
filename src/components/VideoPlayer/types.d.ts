export interface VideoConfig {
  container?: string;
  volume?: number;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  rotate?: number;
  zoom?: number;
  live?: boolean;
  ad?: any;
  backLive?: boolean;
  seek?: number;
  next?: any;
  loaded?: string;
  plug?: string;
  duration?: number;
  preview?: any;
  prompt?: any;
  crossOrigin?: string;
  video?: any;
  type?: string;
  playbackrate?: number;
  ended?: any;
  webFull?: boolean;
  theatre?: any;
  controls?: boolean;
  rightBar?: any;
  smallWindows?: any;
  smallWindowsDrag?: boolean;
  screenshot?: boolean;
  timeScheduleAdjust?: number;
  logo?: string;
  menu?: any;
  information?: Information;
  track?: any;
  title?: string;
  language?: string;
  barHideTime?: number;
  playbackrateOpen?: boolean;
  playbackrateList?: number[];
  cookie?: any;
  domain?: any;
  cookiePath?: string;
  documentFocusPause?: boolean;
  mouseWheelVolume?: number;
  keyVolume?: number;
}

interface Information {
  'Load:': string;
  'Duration:': string;
  'Size:': string;
  'Volume:': string;
  'Sudio decoded:': string;
  'Video decoded:': string;
}