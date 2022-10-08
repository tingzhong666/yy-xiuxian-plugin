import com from "./com.js";
import config from "../config.js";

export default {
  // 门派详情
  detail:{
    redis_per: config.redis_pre + "menpai:",
    // 增 批量
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个hash表 yyxx:menpai:a   yyxx:menpai:b
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
    async del(menpai_id){
      await redis.DEL(this.redis_pre + menpai_id);
    },
    // 改
    async edt(menpai_id, data){
      let tmp = {};
      tmp[menpai_id] = data;
      await com.hash_add(this.redis_pre, tmp);
    },
    // 查
    async query(menpai_id){
      return await redis.HGETALL(this.redis_pre + menpai_id);
    },
  },
  // 门派id列表
  list: {
    redis_pre: config.redis_pre + "menpai",
    // 增 单个集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(menpai_id){
      await redis.SREM(this.redis_pre, menpai_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    }
  },
  // 门派成员id列表
  users: {
    redis_pre: config.redis_pre + "menpaichengyuan:",
    // 增 多个集合 批量元素
    // obj 对象
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个集合 yyxx:menpai_users:a   yyxx:menpai_users:b
      obj = {
        a: ["123", "321"],
        b: ["235235"],
      }
    */
    async add(obj){
      await com.set_add_obj(this.redis_pre, obj);
    },
    // 删 某个门派成员集合
    async del_menpai(menpai_id){
      await redis.DEL(this.redis_pre + menpai_id);
    },
    // 删 某个门派的成员 单个元素
    async del_chengyuan(menpai_id, user_id){
      await redis.SREM(this.redis_pre + menpai_id, user_id);
    },
    // 改
    // 查 某个门派的所有成员
    async query(menpai_id){
      return await redis.SMEMBERS(this.redis_pre + menpai_id);
    }
  },
}