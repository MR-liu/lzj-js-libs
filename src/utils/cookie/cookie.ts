import dmTools from '../tools';
import { ICookie } from './types';
import { isObject, isNumber } from '../checktypes';

const getCookie = key => {
  if (!dmTools.isClient()) {
    return '';
  }
  const cookieStr = document.cookie || '';
  let cookieList = cookieStr.split('; ');
  for (let i = 0; i < cookieList.length; i++) {
    let arr = cookieList[i].split('=');
    if (Array.isArray(arr) && arr.length > 0) {
      const cookieName = arr[0];
      const cookieValue = arr.slice(1).join('');
      if (cookieName === key) {
        return cookieValue;
      }
    } else {
      return '';
    }
  }
  return '';
};

function setCookie(key: string, value: string): void;

function setCookie(key: string, value: string, expired: number): void;

function setCookie(params: { key: string, value: string, domain: string, expired?: number }): void;

function setCookie(...args) {
  if (!dmTools.isClient()) {
    return '';
  }
  let params;
  let key;
  let value;
  let expired;
  let domain;
  [params, value, expired] = args;
  if (isObject(params)) {
    key = params.key;
    value = params.value;
    domain = params.domain;
    if (params.expired) {
      expired = params.expired;
    }
  } else {
    key = params;
  }
  let cookiePath = key + '=' + value + ';path=/';
  if (isNumber(expired)) {
    let oDate = new Date();
    oDate.setTime(oDate.getTime() + expired * 1000);
    cookiePath += ';expires=' + oDate.toUTCString();
  }
  if (domain) {
    cookiePath += ';domain=' + domain;
  }
  document.cookie = cookiePath;
}

const delCookie = (key, domain?: string) => {
  if (domain) {
    setCookie({
      key,
      value: '',
      domain,
      expired: -1000,
    });
  } else {
    setCookie(key, '', -1000);
  }
};

const dmCookie: ICookie = {
  get: getCookie,
  set: setCookie,
  del: delCookie,
};

export default dmCookie;
