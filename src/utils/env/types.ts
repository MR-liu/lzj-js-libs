/** 运行环境 */
export interface IEnv {
	/**
	 * 获取UserAgent
	 */
  getUserAgent: () => string;

	/**
	 * 是否微信
	 */
  isWechat: (userAgent?: string) => boolean;

	/**
	 * 是否百度
	 */
  isBaiduApp: (userAgent?: string) => boolean;

	/**
	 * 是否ios系统
	 */
  isIos: (userAgent?: string) => boolean;

	/**
	 * 是否Android系统
	 */
  isAndroid: (userAgent?: string) => boolean;

	/**
	 * 是否小程序（支持微信7.0.0以上 否则默认false）
	 */
  isWechatMinProgram: (userAgent?: string) => boolean;

	/**
	 * 是否阿里小程序
	 */
  isAlipayClient: (userAgent?: string) => boolean;

	/**
	 * 是否头条app网页
	 */
  isToutiao: (userAgent?: string) => boolean;

	/**
	 * 是否抖音app网页
	 */
  isDouyin: (userAgent?: string) => boolean;

	/**
	 * 是否西瓜视频app网页
	 */
  isXigua: (userAgent?: string) => boolean;

	/**
	 * 是否快手视频app网页
	 */
  isKuaishou: (userAgent?: string) => boolean;

	/**
	 * 是否火山小视频app网页
	 */
  isHuoshan: (userAgent?: string) => boolean;

	/**
	 * 是否头条系app网页
	 */
  isToutiaoSeries: (userAgent?: string) => boolean;

	/**
	 * 是否头条系app网页
	 */
  isToutiaoSeriesApp: (userAgent?: string) => boolean;

	/**
	 * 是否头条系小程序网页
	 */
  isToutiaoSeriesMinProgram: (userAgent?: string) => boolean;
}
