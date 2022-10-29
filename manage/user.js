import model from "../model/index.js";

export default {
  /**
   * 用户面板 获取 不展开具体数值
   * @param {String} user_id 用户id 即qq
   * @returns {Object}
   */
  async  panel_get(user_id){
    let user = await model.user.detail.query(user_id);
    // 装备、门派、阵营、境界
    // 装备
    user.wuqi = user.wuqi ? (await model.zhuangbei.detail.query(user.wuqi)).name : "";
    user.fabao = user.fabao ? (await model.zhuangbei.detail.query(user.fabao)).name : "";
    user.yifu = user.yifu ? (await model.zhuangbei.detail.query(user.yifu)).name : "";
    user.kuzi = user.kuzi ? (await model.zhuangbei.detail.query(user.kuzi)).name : "";
    // 门派
    user.menpai = user.menpai ? (await model.menpai.detail.query(user.menpai)).name : "";
    // 阵营
    user.zhenying = user.zhenying ? (await model.zhenying.detail.query(user.zhenying)).name : "";
    // 境界
    user.jingjie = user.jingjie ? (await model.jingjie.detail.query(user.jingjie)).name : "";

    return user;
  },
  // 用户详情(展开所有属性加成数值) 获取
  async  detail_get(user_id){
    let user = await model.user.detail.query(user_id);

    // 装备、门派、阵营、境界
    // 装备
    user.wuqi = user.wuqi ? await model.zhuangbei.detail.query(user.wuqi) : "";
    user.fabao = user.fabao ? await model.zhuangbei.detail.query(user.fabao): "";
    user.yifu = user.yifu ? await model.zhuangbei.detail.query(user.yifu): "";
    user.kuzi = user.kuzi ? await model.zhuangbei.detail.query(user.kuzi): "";
    // 门派
    user.menpai = user.menpai ? await model.menpai.detail.query(user.menpai) : "";
    // 阵营
    user.zhenying = user.zhenying ? await model.zhenying.detail.query(user.zhenying): "";
    // 境界
    user.jingjie = user.jingjie ? await model.jingjie.detail.query(user.jingjie): "";

    return user;
  },
  /**
   * 用户创建
   * @param {String} user_id qq
   * @returns Boolean false|void 已存在|无返回
   */
  async add(user_id){
    if(await model.user.list.query_one(user_id)) return false;

    let user = {};
    user[user_id] = {
      name: user_id + "",
      daoxuan: "没得道宣",
      xiuwei: 0,
      lingshi: 100,
      // ==== 受变化数值 受装备、门派、阵营、境界加成影响
      // 最终数值=基础固定值之和 * 额外加成百分比 + 额外固定值
      // 这里数据库只存放最终计算值
      xiuliansudu: 0,
      hp: 0,
      fangyuli: 0,
      atk: 0,
      baojilv: 0,
      baoshang: 0,
      qiyun: 0,
      // ==== 会影响受变化属性
      menpai: "",
      zhenying: "",
      jingjie: 1,
      //  ==== 会影响受变化属性 装备类属性
      wuqi: "xiaodao",
      fabao: "maobi",
      yifu: "xiaofu",
      kuzi: "xiaoku",
    };

    // 详情增加
    await model.user.detail.add(user);
    // 用户id列表增加
    await model.user.list.add([user_id]);
    // 计算更新受影响属性
    await this.panel_update(user_id);

    return true;
  },
  // 用户属性值(不会影响受变化属性的属性值，即基本属性) 修改
  async panel_edit(user_id, data){
    let tmp = {
      name: data.name,
      xiuwei: data.xiuwei,
      lingshi: data.lingshi,
      xiuliansudu: data.xiuliansudu,
      hp: data.hp,
      fangyuli: data.fangyuli,
      atk: data.atk,
      baojilv: data.baojilv,
      baoshang: data.baoshang,
      qiyun: data.qiyun,
    };

    await model.user.detail.edt(user_id, tmp);
  },
  // 用户面板数值(受变化属性) 计算及更新
  async panel_update(user_id){
    let obj= {
      xiuliansudu: {
        xiuliansudu_jichu: 0,
        xiuliansudu_ewai_baifenbi: 0,
        xiuliansudu_ewai_guding: 0,
      },
      hp: {
        hp_jichu: 0,
        hp_ewai_baifenbi: 0,
        hp_ewai_guding: 0,
      },
      fangyuli: {
        fangyuli_jichu: 0,
        fangyuli_ewai_baifenbi: 0,
        fangyuli_ewai_guding: 0,
      },
      atk: {
        atk_jichu: 0,
        atk_ewai_baifenbi: 0,
        atk_ewai_guding: 0,
      },
      qiyun: {
        qiyun_jichu: 0,
        qiyun_ewai_baifenbi: 0,
        qiyun_ewai_guding: 0,
      },
      baojilv: 0,
      baoshang: 0,
    };

    // 获取展开数据
    let user = await this.detail_get(user_id);
    // 装备、门派、阵营、境界
    let tmp = [
      // 装备
      "wuqi", "fabao", "yifu", "kuzi",
      // 门派
      "menpau",
      // 阵营
      "zhenying",
      // 境界
      "jingjie",
    ]

    tmp.forEach(v => {
      // 先判断有没有值
      if(!user[v]) return;

      // 累加
      obj.xiuliansudu.xiuliansudu_jichu += user[v].xiuliansudu_jichu * 1 || 0;
      obj.xiuliansudu.xiuliansudu_ewai_baifenbi += user[v].xiuliansudu_ewai_baifenbi * 1 || 0;
      obj.xiuliansudu.xiuliansudu_ewai_guding += user[v].xiuliansudu_ewai_guding * 1 || 0;
      obj.hp.hp_jichu += user[v].hp_jichu * 1 || 0;
      obj.hp.hp_ewai_baifenbi += user[v].hp_ewai_baifenbi * 1 || 0;
      obj.hp.hp_ewai_guding += user[v].hp_ewai_guding * 1 || 0;
      obj.fangyuli.fangyuli_jichu += user[v].fangyuli_jichu * 1 || 0;
      obj.fangyuli.fangyuli_ewai_baifenbi += user[v].fangyuli_ewai_baifenbi * 1 || 0;
      obj.fangyuli.fangyuli_ewai_guding += user[v].fangyuli_ewai_guding * 1 || 0;
      obj.atk.atk_jichu += user[v].atk_jichu * 1 || 0;
      obj.atk.atk_ewai_baifenbi += user[v].atk_ewai_baifenbi * 1 || 0;
      obj.atk.atk_ewai_guding += user[v].atk_ewai_guding * 1 || 0;
      obj.qiyun.qiyun_jichu += user[v].qiyun_jichu * 1 || 0;
      obj.qiyun.qiyun_ewai_baifenbi += user[v].qiyun_ewai_baifenbi * 1 || 0;
      obj.qiyun.qiyun_ewai_guding += user[v].qiyun_ewai_guding * 1 || 0;
      obj.baojilv += user[v].baojilv * 1 || 0;
      obj.baoshang += user[v].baoshang * 1 || 0;
    });

    // 计算
    let data = {};
    data.xiuliansudu = obj.xiuliansudu.xiuliansudu_jichu * (obj.xiuliansudu.xiuliansudu_ewai_baifenbi + 1) + obj.xiuliansudu.xiuliansudu_ewai_guding;
    data.hp = obj.hp.hp_jichu * (obj.hp.hp_ewai_baifenbi + 1) + obj.hp.hp_ewai_guding;
    data.fangyuli = obj.fangyuli.fangyuli_jichu * (obj.fangyuli.fangyuli_ewai_baifenbi + 1) + obj.fangyuli.fangyuli_ewai_guding;
    data.atk = obj.atk.atk_jichu * (obj.atk.atk_ewai_baifenbi + 1) + obj.atk.atk_ewai_guding;
    data.qiyun = obj.qiyun.qiyun_jichu * (obj.qiyun.qiyun_ewai_baifenbi + 1) + obj.qiyun.qiyun_ewai_guding;
    data.baojilv = obj.baojilv;
    data.baoshang = obj.baoshang;

    // 更新
    await model.user.detail.edt(user_id, data);
  },
  // 用户面板会影响受变化属性的属性值 修改
  async panel_zengyi_wupin_edit(user_id, data){
    let tmp = {
      menpai: data.menpai,
      zhenying: data.zhenying,
      jingjie: data.jingjie,
      wuqi: data.wuqi,
      fabao: data.fabao,
      yifu: data.yifu,
      kuzi: data.kuzi,
    };

    // 更新
    await model.user.detail.edt(user_id, tmp);
    // 增益物品具有更改 会受变化的属性值 所以这里还有计算更新一次面板属性
    await this.panel_update(user_id);
  },
  // 用户列表 获取
  async list(){
    return await model.user.list.query();
  },
  // 改名
  async name_edit(user_id, new_name){
    let user = await model.user.detail.query(user_id);
    user.name = new_name;
    model.user.detail.edt(user_id, user);
  },
  /**
   * 境界突破
   * @param {String} user_id 用户id 即qq
   * @returns {Number} 修为不够还差的修为|-1为成功
   */
  async jingjie_tupo(user_id){
    // 查看当前修为是否符合
    let user = await model.user.detail.query(user_id);
    let suoxu_xiuwei = (await model.jingjie.detail.query(user.jingjie)).xiuwei;
    if (user.xiuwei*1 < suoxu_xiuwei*1) return suoxu_xiuwei - user.xiuwei;

    // 境界等级+1 修为扣去
    user.jingjie = (user.jingjie*1) + 1;
    user.xiuwei -= suoxu_xiuwei;
    await model.user.detail.edt(user_id, user);
    return -1;
  }
}