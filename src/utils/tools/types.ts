export enum MinProgramInterfaceType {
	/** 微信 */
	Wechat = 1,
	/** 百度  */
	baidu = 2,
	/** 支付宝  */
	alipay = 3,
	/** 头条系 */
	toutiao = 4,
}

export interface IMinProgramsInterface {
  minProgramsType: MinProgramInterfaceType;
  [key: string]: any;
}

export interface ITools {
	/**
	 * 对比版本
	 * @param currentVersion 当前版本
	 * @param compareVersion 对比版本
	 * @returns 当前比对比大 > 1, 当前比对比小 < 0, 相等 = 0
	 */
  compareVersion(currentVersion: string, compareVersion): number;
	/**
	 * 输入版本和app版本对比
	 * @param compareVersion 对比版本
	 * @returns app版本版本输入版本 大 > 1, 当前比对比小 < 0, 相等 = 0
	 */
  compareAppVersion(compareVersion): number;
	/** 获取小程序实例 */
  getMinProgramsInterface(): Promise<IMinProgramsInterface | null>;
	/** 是否客服端 */
  isClient(): boolean;
}
