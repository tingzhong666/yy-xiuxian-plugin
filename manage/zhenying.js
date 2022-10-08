import model from "../model/index.js";

export default {
  // 阵营详情 获取
  async get_detail(zhenying_id){
    return await model.zhenying.detail.query(zhenying_id);
  },
  // 阵营 增加 批量
  async add(obj){
    await model.zhenying.detail.add(obj);
  },
  // 阵营 修改
  async edit(zhenying_id, newData){
    await model.zhenying.detail.edt(zhenying_id, newData);
  },
  // 阵营 删除
  async del(zhenying_id, new_zhenying_id = ""){
    //---  更新门派列表 new_zhenying_id没有koi将他们阵营随机改变
    let menpai_id_arr = await model.zhenying.menpai_list.query(zhenying_id);
    let zhenying_id_list = await model.zhenying.list.query();
    new_zhenying_id = new_zhenying_id || zhenying_id_list[0] || ""; // 都没有就为空
    menpai_id_arr.forEach(async menpai_id => {
      let menpai_detail = await model.menpai.detail.query(menpai_id);
      menpai_detail.zhenying = new_zhenying_id;
    });
    // 删除阵营id列表中的id
    await model.zhenying.list.del(zhenying_id);
    // 删除所属阵营的门派列表集合
    await model.zhenying.menpai_list.del_menpai(zhenying_id);

    // 删除详情
    await model.zhenying.detail.del(zhenying_id);
  },
  // 阵营中的门派列表 获取
  async zhenying_menpai_get(zhenying_id){
    return await model.zhenying.menpai_list.query(zhenying_id);
  },
}