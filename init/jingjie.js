import manage from "../manage/index.js";

export default {

  async init(){
    await manage.jingjie.add(this.jingjie_arr);
  },

  jingjie_arr: {
    "1": { name: "凡人", xiuwei: 0, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "2": { name: "后天初期", xiuwei: 1000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "3": { name: "后天中期", xiuwei: 2000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "4": { name: "后天后期", xiuwei: 4000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "5": { name: "后天大圆满", xiuwei: 8000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "6": { name: "后天巅峰", xiuwei: 16000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "7": { name: "半步先天", xiuwei: 32000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
    "8": { name: "先天初期", xiuwei: 64000, atk_jichu: 10, fangyulli_jichu: 10, hp_jichu: 100, qiyun_jichu: 0, xiuliansudu_jichu: 1 },
  },
}