import jsCookie from 'js-cookie';

export default function getVideoPlayTimeFromCookie(catalogId?: string) {
  if (!catalogId) {
    return 0;
  }
  const lastPlayTimeCookie = jsCookie.get('ckplayer-player-cookie')
  const historyVideos = lastPlayTimeCookie?.split(',');
  if (historyVideos) {
    const currentHistoryVideo = historyVideos.find((item) => {
      return item.split(';')?.[0] === catalogId
    })
    const historySecond = currentHistoryVideo?.split(';')[1]
    return Number(historySecond) / 100
  }
  return 0
}