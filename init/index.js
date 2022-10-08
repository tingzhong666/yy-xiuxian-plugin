import config from "../config.js";
import jingjie from "./jingjie.js";
import menpai from "./menpai.js";
import zhenying from "./zhenying.js";
import zhuangbei from "./zhuangbei.js";


export default {
  async run(){
    await Promise.all([
      jingjie.init(),
      menpai.init(),
      zhenying.init(),
      zhuangbei.init(),
    ]);
  },

  // 批量删除
  /**
   * yy修仙数据库清空
   * @param {Boolean} user_clear 是否一并清空用户数据 true 是 false 否
   */
  async clear(user_clear = false){
    let yyxx_keys = await redis.KEYS(config.redis_pre + "*");

    yyxx_keys.forEach(k => {
      redis.DEL(k);
    });
  }
}