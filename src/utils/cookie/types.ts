/** Cookie操作 */
export interface ICookie {
	/**
	 * 设置cookie
	 * @param key 存储key
	 * @param value 存储数据
	 */
  set(key: string, value: string): void;
	/**
	 * 设置cookie
	 * @param key 存储key
	 * @param value 存储数据
	 * @param expired 过期时间(秒)
	 */
  set(key: string, value: string, expired: number): void;
	/**
	 * 设置cookie
	 * @param params object
	 */
  set(params: {
		/**
		 * cookie名称
		 */
    key: string;
		/**
		 * cookie值
		 */
    value: string;
		/**
		 * cookie 域名
		 */
    domain?: string;
		/**
		 * cookie 过期时间(秒)
		 */
    expired?: number;
  }): void;

  get(key: string): string;
	/**
	 * 删除cookie
	 * @param key cookieKey
	 * @param domain domain
	 */
  del(key: string, domain?: string): void;
}
