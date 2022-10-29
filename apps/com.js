import config from "../config.js";

export default {
  async cmd_pre_del(str, cmd_pre){
    // 剔除命令前缀
    let reg = new RegExp("^" + config.cmd_pre);
    let new_name = str.replace(reg, "");
    // 剔除命令文本
    reg = new RegExp("^" + cmd_pre);
    new_name = new_name.replace(reg, "");
  },

  // 增益物品的属性展示 处理
  attr_handle(data){
    let res = [];
    let attr = [
      { key: "atk_jichu", name: "基础攻击力"},
      { key: "atk_ewai_baifenbi", name: "额外百分比攻击力"},
      { key: "atk_ewai_guding", name: "额外攻击力"},
      { key: "fangyuli_jichu", name: "基础防御力"},
      { key: "fangyuli_ewai_baifenbi", name: "额外百分比防御力"},
      { key: "fangyuli_ewai_guding", name: "额外防御力"},
      { key: "hp_jichu", name: "基础血量"},
      { key: "hp_ewai_baifenbi", name: "额外百分比血量"},
      { key: "hp_ewai_guding", name: "额外血量"},
      { key: "qiyun_jichu", name: "基础气运"},
      { key: "qiyun_ewai_baifenbi", name: "额外百分比气运"},
      { key: "qiyun_ewai_guding", name: "额外气运"},
      { key: "baojilv", name: "暴击率"},
      { key: "baoshang", name: "暴击伤害"},
    ];

    attr.forEach(v => {
      if(data[v.key] && (data[v.key]*1) != 0)
      {
        res.push({ name: v.name, value: data[v.key], key: v.key });
      }
    });

    return res;
  }
}