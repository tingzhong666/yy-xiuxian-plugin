import manage from "../manage/index.js";

export default {
  async init(){
    // 武器类型
    manage.zhuangbei.type_add(this.type_list);
    // 武器
    manage.zhuangbei.add(this.data);
  },

  type_list: ["fabao", "wuqi", "hujia", "hutui"],
  data: {
    maobi: {
      name: "毛笔",
      atk_jichu: 100,
      atk_ewai_baifenbi: 0,
      atk_ewai_guding: 0,
      fangyuli_jichu: 0,
      fangyuli_ewai_baifenbi: 0,
      fangyuli_ewai_guding: 0,
      hp_jichu: 0,
      hp_ewai_baifenbi: 0,
      hp_ewai_guding: 0,
      qiyun_jichu: 0,
      qiyun_ewai_baifenbi: 0,
      qiyun_ewai_guding: 0,
      baojilv: 0.01,
      baoshang: 0.01,
      type: "fabao"
    },
    xiaodao: {
      name: "小刀",
      atk_jichu: 100,
      atk_ewai_baifenbi: 0,
      atk_ewai_guding: 0,
      fangyuli_jichu: 0,
      fangyuli_ewai_baifenbi: 0,
      fangyuli_ewai_guding: 0,
      hp_jichu: 0,
      hp_ewai_baifenbi: 0,
      hp_ewai_guding: 0,
      qiyun_jichu: 0,
      qiyun_ewai_baifenbi: 0,
      qiyun_ewai_guding: 0,
      baojilv: 0.01,
      baoshang: 0.01,
      type: "wuqi"
    },
    xiaofu: {
      name: "校服",
      atk_jichu: 100,
      atk_ewai_baifenbi: 0,
      atk_ewai_guding: 0,
      fangyuli_jichu: 0,
      fangyuli_ewai_baifenbi: 0,
      fangyuli_ewai_guding: 0,
      hp_jichu: 0,
      hp_ewai_baifenbi: 0,
      hp_ewai_guding: 0,
      qiyun_jichu: 0,
      qiyun_ewai_baifenbi: 0,
      qiyun_ewai_guding: 0,
      baojilv: 0.01,
      baoshang: 0.01,
      type: "yifu"
    },
    xiaoku: {
      name: "校裤",
      atk_jichu: 100,
      atk_ewai_baifenbi: 0,
      atk_ewai_guding: 0,
      fangyuli_jichu: 0,
      fangyuli_ewai_baifenbi: 0,
      fangyuli_ewai_guding: 0,
      hp_jichu: 0,
      hp_ewai_baifenbi: 0,
      hp_ewai_guding: 0,
      qiyun_jichu: 0,
      qiyun_ewai_baifenbi: 0,
      qiyun_ewai_guding: 0,
      baojilv: 0.01,
      baoshang: 0.01,
      type: "kuzi"
    },
  },
}