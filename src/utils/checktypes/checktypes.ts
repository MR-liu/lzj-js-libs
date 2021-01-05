import { returnFunc } from './types';

const TYPES_LIST: string[] = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ');
const TYPES_OBJECT: { [key: string]: any } = {};

TYPES_LIST.forEach(item => {
  TYPES_OBJECT[`is` + item] = (data: any): boolean => {
    return Object.prototype.toString.call(data) === '[object ' + item + ']';
  };
});

export const isFunction: returnFunc = TYPES_OBJECT.isFunction;
export const isArray: returnFunc = TYPES_OBJECT.isArray;
export const isObject: returnFunc = TYPES_OBJECT.isObject;
export const isDate: returnFunc = TYPES_OBJECT.isDate;
export const isRegExp: returnFunc = TYPES_OBJECT.isRegExp;
export const isNumber: returnFunc = TYPES_OBJECT.isNumber;
export const isString: returnFunc = TYPES_OBJECT.isString;
export const isBoolean: returnFunc = TYPES_OBJECT.isBoolean;
