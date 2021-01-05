import { IEnv } from './types';

const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return typeof window !== undefined && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
};

const isWechat = (userAgent?: string) => {
  return /micromessenger/i.test(getUserAgent(userAgent));
};

const isBaiduApp = (userAgent?: string) => {
  return /baiduboxapp/i.test(getUserAgent(userAgent));
};

const isAndroid = (userAgent?: string) => {
  return /android/i.test(getUserAgent(userAgent));
};

const isIos = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /iphone os/i.test(ua) || /ipad/i.test(ua);
};

const isAlipayClient = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('AlipayClient') > -1;
};

const isWechatMinProgram = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return isWechat(ua) && ua.indexOf('miniprogram') > -1;
};

const isToutiao = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('newsarticle') > -1;
};

const isDouyin = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('aweme') > -1;
};

const isXigua = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('videoarticle') > -1;
};

const isHuoshan = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('live_stream') > -1;
};

const isToutiaoSeriesApp = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return isToutiao(ua) || isDouyin(ua) || isXigua(ua) || isHuoshan(ua);
};

const isToutiaoSeries = (userAgent?: string) => isToutiaoSeriesApp(userAgent);

const isToutiaoSeriesMinProgram = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return ua.indexOf('toutiaomicroapp') > -1;
};

const isKuaishou = (userAgent?: string) => {
  return (getUserAgent(userAgent)).indexOf('kwai') > -1;
};

const device: IEnv = {
  getUserAgent,
  isWechat,
  isBaiduApp,
  isAndroid,
  isIos,
  isWechatMinProgram,
  isAlipayClient,
  isToutiao,
  isDouyin,
  isXigua,
  isHuoshan,
  isToutiaoSeries,
  isToutiaoSeriesApp,
  isToutiaoSeriesMinProgram,
  isKuaishou,
};

export default device;
