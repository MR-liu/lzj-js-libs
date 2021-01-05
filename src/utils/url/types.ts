/** URL操作 */
export interface IUrl {
	/**
	 * url转object
	 * @param url 需解析的地址
	 */
  parse(url?: string): { [key: string]: string };
	/**
	 * object转url
	 * @param 需要转换的object
	 * @param 转换的前置url
	 */
  format(data: { [key: string]: string }, prefix: string): string;
	/**
	 * 获取url指定的值
	 * @param 获取值的名称
	 */
  get(key: string): string;
}
