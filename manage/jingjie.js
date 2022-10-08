import model from "../model/index.js";

export default {
  // 境界详情 获取
  async detail_get(jingjie_id){
    return await model.jingjie.detail.query(jingjie_id);
  },
  // 境界列表 获取
  async list(){
    return await model.jingjie.list.query();
  },
  // 境界增加 批量
  /**
   * 
   * @param {Object} obj 批量境界对象
   * obj属性名为境界id
   * obj.id.name 境界名称
   * 其他属性 参考数据库设计
   */
  async add(obj){
    // 详情增加
    await model.jingjie.detail.add(obj);
    // 列表id增加
    let tmp = Object.keys(obj);
    await model.jingjie.list.add(tmp);
  },
  // 境界删除
  async del(jingjie_id){
    // 详情表删除
    await model.jingjie.detail.del(jingjie_id);
    // 列表id删除
    await model.jingjie.list.del(jingjie_id);
  },
  // 境界属性值修改
  async edit(jingjie_id, data){
    await model.jingjie.detail.edt(jingjie_id, data);
  },
}