import com from "./com.js";
import config from "../config.js";

export default {
  /**
   * 纳戒 物品id集合 每个用户一个
   */
  najie:{
    redis_per: config.redis_pre + "najie:",
    // 增 物品 单个
    async add(wupin_id, user_id){
      await com.set_add_arr(this.redis_per + user_id, [wupin_id]);
    },
    // 删 物品 单个
    async del(wupin_id, user_id){
      await redis.SREM(this.redis_per + user_id, wupin_id);
    }
  },
  /**
   * 物品类型id集合 设定数据 仅一个
   */
  wupin_type_list:{
    redis_per: config.redis_pre + "wupin_type",
    /**
     * 增 单个
     * @param {*} wupin_type_id 
     */
    async add(wupin_type_id){
      await com.set_add_arr(this.redis_per, [wupin_type_id]);
    },
  },
  /**
   * 物品详情 hash表 每个物品一个
   */
  wupin:{
    redis_per: config.redis_pre + "wupin:",
    // 获取
    async get(wupin_id){
      return await redis.HGETALL(this.redis_per + wupin_id);
    },
    // 增加 单个
    async add(wupin_id, obj){
      let tmp = {};
      tmp[this.redis_per + wupin_id] = obj
      await com.hash_add(tmp);
    },
    // 删除 单个
    async del(wupin_id){
      await redis.DEL(this.redis_per + wupin_id);
    },
  },
}