import com from "./com.js";
import config from "../config.js";

export default {
  // 装备详情
  detail:{
    redis_per: config.redis_pre + "zhuangbei:",
    // 增 批量
    /*
      config.redis_pre = "yyxx:" 时
      例：将添加2个hash表 yyxx:zhuangbei:a   yyxx:zhuangbei:b
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
    async del(zhuangbei_id){
      await redis.DEL(this.redis_pre + zhuangbei_id);
    },
    // 改
    async edt(zhuangbei_id, data){
      let tmp = {};
      tmp[zhuangbei_id] = data;
      await com.hash_add(this.redis_pre, tmp);
    },
    // 查
    async query(zhuangbei_id){
      return await redis.HGETALL(this.redis_pre + zhuangbei_id);
    },
  },
  // 所有装备id列表
  list: {
    redis_pre: config.redis_pre + "zhuangbei",
    // 增 单个集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(zhuangbei_id){
      await redis.SREM(this.redis_pre, zhuangbei_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    }
  },
  // 所有装备类型id列表
  type_list: {
    redis_pre: config.redis_pre + "zhuangbeileixing",
    // 增 单个集合 批量元素
    // arr 数组 只能为字符串
    async add(arr){
      await com.set_add_arr(this.redis_pre, arr);
    },
    // 删 单个元素
    async del(type_id){
      await redis.SREM(this.redis_pre, type_id);
    },
    // 改
    // 查 所有元素
    async query(){
      return await redis.SMEMBERS(this.redis_pre);
    }
  },
  // 某装备类型中的装备id列表
  type_zhuangbei_list: {
    redis_pre: config.redis_pre + "zhuangbeileixing:",
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
    // 增 单个集合 多个元素
    // arr 装备id数组
    async add_one(type_id, arr){
      await com.set_add_arr(this.redis_pre + type_id, arr);
    },
    // 删 某个类型的装备列表集合
    async del_type(zhuanbei_type_id){
      await redis.DEL(this.redis_pre + zhuanbei_type_id);
    },
    // 删 某个类型的装备列表中的装备id 单个元素
    async del_chengyuan(zhuanbei_type_id, zhuangbei_id){
      await redis.SREM(this.redis_pre + zhuanbei_type_id, zhuangbei_id);
    },
    // 改
    // 查 某个类型的装备列表
    async query(zhuanbei_type_id){
      return await redis.SMEMBERS(this.redis_pre + zhuanbei_type_id);
    }
  },
}