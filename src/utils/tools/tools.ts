import dmCookie from '../cookie';
import { ITools, IMinProgramsInterface } from './types';
import device from '../env';

/**
 * 对比version > 0 | = 0 | < 0
 * @param v1 version1
 * @param v2 version2
 */
export const compareVersion = (v1: string, v2: string): number => {
  let _v1: string[] = v1.split('.');
  let _v2: string[] = v2.split('.');
  let _r = parseInt(_v1[0], 10) - parseInt(_v2[0], 10);

  return _r === 0 && v1 !== v2
		? compareVersion(_v1.splice(1).join('.'), _v2.splice(1).join('.'))
		: _r;
};

const isClient = () => typeof window !== 'undefined';

/**
 * 验证是否小程序
 * 微信7.0.0以后推荐使用dmEnv.isWechatMinProgram
 */
const getMinProgramsInterface = (): Promise<IMinProgramsInterface | null> => {
  return new Promise<IMinProgramsInterface | null>(resolve => {
		// 判断是否是客户端
    if (!isClient()) {
      resolve(null);
      return;
    }
    const _window = window;
    if (device.isWechat()) {
      if ('wx' in _window) {
        wx.miniProgram.getEnv(res => {
          if (res.miniprogram) {
            resolve({
              minProgramsType: 1,
              ...wx,
            });
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    } else if (device.isBaiduApp()) {
      if ('swan' in _window && !!swan) {
        swan.webView.getEnv(res => {
          if (res.smartprogram) {
            swan.miniProgram = Object.assign({}, swan.webView);
            resolve({
              minProgramsType: 2,
              ...swan,
            });
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    } else if (device.isAlipayClient()) {
      if ('my' in _window) {
        my.getEnv(res => {
          if (res.miniprogram) {
            resolve({
              minProgramsType: 3,
              miniProgram: my,
            });
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    } else if (device.isToutiaoSeriesMinProgram()) {
      if ('tt' in _window) {
        tt.miniProgram ? resolve({
          minProgramsType: 4,
          ...tt,
        }) : resolve(null);
      } else {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  });
};

/**
 * 当前版本和app版本对比
 * @param version 版本号
 * @returns > 0 小于app当前版本，符合  == 0 等于app当前版本  < 0 大于app当前版本
 */
const compareAppVersion = (version: string) => {
  const APP_VERSION = dmCookie.get('app_version');
  return compareVersion(APP_VERSION, version);
};

/** 获取微信版本 非微信返回0.0.0 */
export const getWechatVersion = (userAgent?: string) => {
  let ua = userAgent ? userAgent.toLowerCase() : '';
  if (device.isWechat(ua)) {
    const wechatInfo = (ua || navigator.userAgent.toLowerCase()).match(/MicroMessenger\/([\d\.]+)/i);
    let wechatVersion = '0.0.0';
    if (wechatInfo) {
      wechatVersion = wechatInfo[1];
    }
    return wechatVersion;
  }
  return '0.0.0';
};

const tools: ITools = {
  compareVersion,
  compareAppVersion,
  getMinProgramsInterface,
  isClient,
};

export default tools;
