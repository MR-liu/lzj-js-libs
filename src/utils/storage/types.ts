/** 存储继承接口 */
export interface IStorageBase {
	/**
	 * 存储数据
	 * @param key 存储的key
	 * @param value 存储的值
	 */
  set(key: string, value: string | { [key: string]: string }): void;
	/**
	 * 存储数据
	 * @param key 存储的key
	 * @param value 存储的值
	 * @param expired 过期时间(秒)
	 */
  set(
		key: string,
		value: string | { [key: string]: string },
		expired: number,
	): void;
	/**
	 * 获取存储的数据
	 */
  get(key: string): string | null;
	/**
	 * 删除指定的key
	 * @param key 删除值
	 */
  del(key: string): void;
	/**
	 * 清除所有key
	 */
  clear(): void;
}

/** localStorage */
export interface ISessionStorage extends IStorageBase { }

/** sessionStorage */
export interface ILocalStorage extends IStorageBase { }

/** 存储接口 */
export interface IStorage {
  session: ISessionStorage;
  local: ILocalStorage;
}
