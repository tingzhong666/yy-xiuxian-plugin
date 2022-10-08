import com from "./com.js";
import config from "../config.js";

export default {
  // 境界详情
  detail: {
    redis_pre: config.redis_pre + "jingjie:",
    // 增 批量
    // arr 对象 
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个hash表 yyxx:jingjie:a   yyxx:jingjie:b
      obj = {
        a: {
          name: "呵呵"
          type: "qwe"
        },
        b {
          name: "哈哈"
          type: "ewq"
        }
      }
    */
    async add(obj){
      await com.hash_add(this.redis_pre, obj);
    },
    // 删 单个
    async del(jingjie_id){
      await redis.DEL(this.redis_pre + jingjie_id);
    },
    // 改 单个
    async edt(jingjie_id, data){
      let tmp = {};
      tmp[jingjie_id] = data;
      await com.hash_add(this.redis_pre, tmp);
    },
    // 查
    async query(jingjie_id){
      return await redis.HGETALL(this.redis_pre + jingjie_id);
    },
  },
  // 境界id列表
  list: {
    redis_pre: config.redis_pre + "jingjie",
    // 增 单个 集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(jingjie_id){
      await redis.SREM(this.redis_pre, jingjie_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    }
  },
}