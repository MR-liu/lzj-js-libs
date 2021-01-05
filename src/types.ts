import { IWx } from './types/wechat';

declare global {
	const wx: IWx;
	const swan: {
  webView: any
  [key: string]: any,
};
	const my: any;
	const tt: any;
}
