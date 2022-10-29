export default {
  // hash哈希表 批量增改
  // key 键名前缀
  // obj 对象 每个属性为一个hash表 属性名作为键名后缀
  /*
  例：将添加2个hash表 hello:a   hello:b
  key = "hello:"
  obj = {
    a: {
      name: "呵呵"
      type: "qwe"
    },
    b: {
      name: "哈哈"
      type: "ewq"
    }
  }
  */
  async hash_add(key_pre, obj)
  {
    Object.keys(obj).forEach(k => {
      // 添加 字段
      Object.keys(obj[k]).forEach(async k2 => {
        try {
          await redis.HSET(key_pre + k, k2, obj[k][k2]);
        } catch (error) {
          logger.error("========================");
          logger.error("model.com.hash_add:");
          logger.error("key_pre: " + key_pre);
          logger.error("k: " + k);
          logger.error("k2: " + k2);
          // logger.error("obj[k][k2]: " + obj[k][k2]);
          logger.error("========================");

          throw error;
        }
      });
    });
  },

  /**
   * set集合 单个集合 多个元素 添加
   * arr 数组 属性只能为字符串
   * @param {*} key 
   * @param {*} arr 
   */
  async set_add_arr(key, arr){
    // 添加
    arr.forEach(async v => {
      await redis.SADD(key, v + "");
    });
  },

  // 
  /*
    例：将添加2个集合 hello:a   hello:b
    key = "hello:"
    obj = {
      a: ["123", "321"],
      b: ["235235"],
    }
  */
 /**
  * set集合 多个集合 多个元素 添加
  * 例：将添加2个集合 hello:a   hello:b
    key = "hello:"
    obj = {
      a: ["123", "321"],
      b: ["235235"],
  * @param {*} key 
  * @param {*} obj 
  */
  async set_add_obj(key, obj){
    // 批量集合 循环
    Object.keys(obj).forEach(async k => {
      // 单个集合
      await redis.SADD(key + k, ...obj[k]);
    });
  },

  // ====== 数据处理 全部转 字符串
  async to_string_arr(arr){

  }
}