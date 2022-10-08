import com from "./com.js";
import config from "../config.js";

export default {
  // 用户详情
  detail:{
    redis_pre: config.redis_pre + "user:",
    // 增 批量
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个hash表 yyxx:user:a   yyxx:user:b
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
    async del(user_id){
      await redis.DEL(this.redis_pre + user_id);
    },
    // 改 单个
    async edt(user_id, data){
      let tmp = {};
      tmp[user_id] = data;
      await com.hash_add(this.redis_pre, tmp);
    },
    // 查
    async query(user_id){
    return await redis.HGETALL(this.redis_pre + user_id);
    },
  },
  // 用户id列表 用户id就是qq
  list: {
    redis_pre: config.redis_pre + "users",
    // 增 单个集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(user_id){
      await redis.SREM(this.redis_pre, user_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    },
    /**
     * 查 单个元素 用户id是否已存在
     * @param {String} user_id 用户id 即qq
     * @returns Boolean true|false 存在|不存在
     */
    async query_one(user_id){
      // 如果用户id集合不存在 说明1个用户都没有
      if(!(await redis.EXISTS(this.redis_pre))) return false;

      // 查询用户id
      if(await redis.SISMEMBER(this.redis_pre, user_id + "") == 1) return true;
      else return false;
    },
  },
}