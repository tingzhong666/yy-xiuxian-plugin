import model from "../model/index.js";

export default {
  // 门派详情 获取
  async detail_get(menpai_id){
    return await model.menpai.detail.query(menpai_id);
  },
  // 门派 增加 批量
  /**
   * 
   * @param {Object} obj 批量门派对象
   * obj属性名为门派id
   * obj.id.name 门派名称
   * 其他属性 参考数据库设计
   */
  async add(obj){
    // 详情增加
    await model.menpai.detail.add(obj);
    // 列表id增加
    let tmp = Object.keys(obj);
    await model.menpai.list.add(tmp);

    // ---阵营中的门派列表更新
    tmp.forEach(async menpai_id => {
      await model.zhenying.menpai_list.add_one(obj[menpai_id].zhenying, [menpai_id]);
    });
  },
  // 门派 删除
  async del(menpai_id){
    // ---阵营中的门派列表删除更新
    let res = await model.menpai.detail.query(menpai_id);
    await model.zhenying.menpai_list.del_chengyuan(res.zhenying, menpai_id);

    // 详情表删除
    await model.menpai.detail.del(menpai_id);
    // 列表id删除
    await model.menpai.list.del(menpai_id);
    // 门派成员列表 这个集合删除
    await model.menpai.users.del_menpai(menpai_id);
  },
  // 门派属性值 修改
  async edit(menpai_id, data){
    // ---更改阵营 需要更新阵营信息
    let old = await model.menpai.detail.query(menpai_id);
    // 新数据与旧数据中的阵营比较 不一样再更改
    if(old.zhenying != data.zhenying)
    {
      // 删除旧数据中的阵营里门派成员 
      await model.zhenying.menpai_list.del_chengyuan(old.zhenying, menpai_id);
      // 添加到新数据中的阵营里门派成员
      await model.zhenying.menpai_list.add_one(data.zhenying, [menpai_id]);
    }

    // 门派修改
    await model.jingjie.detail.edt(menpai_id, data);
  },
  // 门派列表 获取
  async list(){
    return await model.menpai.list.query();
  },
  // 门派成员列表 获取
  async menpai_users_get(menpai_id)
  {
    return await model.menpai.users.query(menpai_id);
  },
}