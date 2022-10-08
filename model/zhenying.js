import com from "./com.js";
import config from "../config.js";

export default {
  //阵营详情
  detail:{
    redis_per: config.redis_pre + "zhenying:",
    // 增 批量
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个hash表 yyxx:zhenying:a   yyxx:zhenying:b
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
    async del(zhenying_id){
      await redis.DEL(this.redis_pre + zhenying_id);
    },
    // 改
    async edt(zhenying_id, data){
      let tmp = {};
      tmp[zhenying_id] = data;
      await com.hash_add(this.redis_pre, tmp);
    },
    // 查
    async query(zhenying_id){
      return await redis.HGETALL(this.redis_pre + zhenying_id);
    },
  },
  //阵营id列表
  list: {
    redis_pre: config.redis_pre + "zhenying",
    // 增 单个集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(zhenying_id){
      await redis.SREM(this.redis_pre, zhenying_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    }
  },
  //某阵营中的门派列表
  menpai_list: {
    redis_pre: config.redis_pre + "zhenying_menpai_list:",
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
    // 增 单个集合 批量元素
    async add_one(zhenying_id, menpai_id_arr){
      await com.set_add_arr(this.redis_pre + zhenying_id, menpai_id_arr);
    },
    // 删 某个阵营的门派列表集合
    async del_menpai(zhenying_id){
      await redis.DEL(this.redis_pre + zhenying_id);
    },
    // 删 某个阵营的门派列表中的门id 单个元素
    async del_chengyuan(zhenying_id, menpai_id){
      await redis.SREM(this.redis_pre + zhenying_id, menpai_id);
    },
    // 改
    // 查 某个阵营的门派列表
    async query(zhenying_id){
      return await redis.SMEMBERS(this.redis_pre + zhenying_id);
    }
  },
}