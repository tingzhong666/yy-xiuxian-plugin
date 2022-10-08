import model from "../model/index.js";

export default {
  // 装备详情 获取
  async get(zhuangbei_id){
    return await model.zhuangbei.detail.query(zhuangbei_id);
  },
  // 装备 删除
  async del(zhuangbei_id){
    let res = await model.zhuangbei.detail.query(zhuangbei_id);
    // ---- 删除 某类型装备里所有装备id列表中的装备id
    await model.zhuangbei.type_zhuangbei_list.del_chengyuan(res.type, zhuangbei_id);
    // ---- 删除 所有装备id列表中的装备id
    await model.zhuangbei.list.del(zhuangbei_id);
    // 删除详情
    await model.zhuangbei.detail.del(zhuangbei_id);

  },
  // 装备 修改
  async edit(zhuangbei_id, newData){
    // ---- 判断装备类型 是否修改, 修改了 就要更新 2个类型装备里的装备id列表
    let old = await model.zhuangbei.detail.query(zhuangbei_id);
    if(newData.type != old.type)
    {
      // 删旧
      await model.zhuangbei.type_zhuangbei_list.del_chengyuan(old.type, zhuangbei_id);
      // 增新
      await model.zhuangbei.type_zhuangbei_list.add_one(newData.type, [zhuangbei_id]);
    }

    // 详情修改
    await model.zhuangbei.detail.edt(zhuangbei_id, newData);
  },
  // 装备 新增 批量
  async add(obj){
    Object.keys(obj).forEach(async zhuangbei_id => {
      // ---- 更新 某类型装备的装备id列表
      await model.zhuangbei.type_zhuangbei_list.add_one(obj[zhuangbei_id].type, [zhuangbei_id]);
      // ---- 更新 所有装备id列表中的装备id
      await model.zhuangbei.list.add([zhuangbei_id]);
    });
    // 详情新增
    await model.zhuangbei.detail.add(obj);
  },

  // 装备类型 新增 批量
  async type_add(type_id_arr){
    await model.zhuangbei.type_list.add(type_id_arr);
  },
  // 装备类型 删除
  async type_del(type_id, new_type_id = ""){
    // ---- 装备类型id列表 id删除
    await model.zhuangbei.type_list.del(type_id);
    // ---- 某类型装备的装备id列表 类型改变
    let zhuangbei_id_arr = await model.zhuangbei.type_zhuangbei_list.query(type_id);
    let type_id_arr = await model.zhuangbei.type_list.query();
    new_type_id = new_type_id || type_id_arr[0] || "";
    zhuangbei_id_arr.forEach(async zhuangbei_id => {
      let zhaungbei = await model.zhuangbei.detail.query(zhuangbei_id);
      zhuangbei.type = new_type_id;
      await model.zhuangbei.detail.edt(zhuangbei_id, zhuangbei);
    });
  },

  // 某类型装备里所有装备id列表 获取
  async type_zhuangbei_id_list_get(type_id){
    return await model.zhuangbei.type_zhuangbei_list.query(type_id);
  },
}