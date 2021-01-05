import dmTools from '../tools';
import { IUrl } from './types';
import { isObject } from '../checktypes';

const parse = (_url?: string) => {
  let url = _url || '';
  if (!url && dmTools.isClient()) {
    url = location.search;
  }
  try {
    let result: { [key: string]: string } = {};
    let data: string[];
    let queryStartIndex = url.indexOf('?');

    if (queryStartIndex !== -1) {
      url = url.slice(queryStartIndex + 1);
    } else {
      return {};
    }
    data = url.split('&');
    if (data.length === 0) {
      return result;
    }
    data.forEach(item => {
      let items: string[] = item.split('=');
      if (items[0]) {
        result[items[0]] = items.slice(1).join('=') || '';
      }
    });
    return result;
  } catch (e) {
    console.error(e);
    return {};
  }
};
const get = (key: string) => {
  return parse()[key] || '';
};
const format = (data = {}, prefix = '') => {
  const [hostpath, search] = prefix.split('?');
  let queryString = '';
  if (isObject(data)) {
    let queryParams = {};
    if (search) { queryParams = parse('?' + search); }
    queryParams = { ...queryParams, ...data };
    queryString = Object.keys(queryParams).map(key => {
			return `${key}=${queryParams[key]}`;
		}).join('&');
  } else {
    return prefix;
  }
  return hostpath + '?' + queryString;
};

const dmUrl: IUrl = {
  parse,
  format,
  get,
};

export default dmUrl;
