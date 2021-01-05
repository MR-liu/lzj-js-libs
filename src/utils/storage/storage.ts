import { IStorage, IStorageBase } from './types';
import { isObject } from '../checktypes';
import tools from '../tools';

type storageType = 'local' | 'session';
type storageDataType = {
  value: string,
  expired?: number,
  now?: number,
};

const formatData = (_value, expired = 0) => {
  let value = _value;
  if (isObject(value)) {
    value = JSON.stringify(_value);
  }
  const data: storageDataType = {
    value,
  };
  if (!isNaN(expired) && expired !== 0) {
    data.expired = expired;
    data.now = +new Date();
  }
  return JSON.stringify(data);
};

const getKey = key => key;

function setStorage(type: storageType) {
  let storageInterface = {
    setItem() {},
    getItem() {return null; },
    removeItem() {},
    clear() {},
    length: 0,
    key() {return null; },
  } as Storage;
  if (tools.isClient()) {
    if (type === 'session') {
      storageInterface = window.sessionStorage;
    } else {
      storageInterface = window.localStorage;
    }
  }
  function set(key: string, value: string | { [key: string]: string }): void;
  function set(key: string, value: string | { [key: string]: string }, expired: number): void;
  function set(...args) {
    if (!tools.isClient()) {
      return false;
    }
    const [key, value, expired] = args;
    storageInterface.setItem(getKey(key), formatData(value, expired));
  }
  return {
    set,
    get(key) {
      if (!tools.isClient()) {
        return '';
      }
      const resultStr = storageInterface.getItem(getKey(key));
      if (resultStr === null) {
        return null;
      }
      try {
        const result: storageDataType = JSON.parse(resultStr);
        if (result.now && result.expired && +new Date() > result.now + result.expired) {
          storageInterface.removeItem(getKey(key));
          return null;
        }
        return result.value;
      } catch (e) {
        return null;
      }
    },
    del(key) {
      if (!tools.isClient()) {
        return false;
      }
      storageInterface.removeItem(getKey(key));
    },
    clear() {
      if (!tools.isClient()) {
        return false;
      }
      storageInterface.clear();
    },
  };
}

const ss: IStorageBase = setStorage('session');
const ls: IStorageBase = setStorage('local');

const storageBase = {
  session: ss,
  local: ls,
};

const storage: IStorage = storageBase;

export default storage;
export const sessionStorage = storageBase.session;
export const localStorage = storageBase.local;
