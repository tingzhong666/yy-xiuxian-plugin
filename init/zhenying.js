import manage from "../manage/index.js";

export default {
  async init(){
    manage.zhenying.add(this.data);
  },

  data: {
    zhixu: {
      name: "秩序"
    },
    hundun: {
      name: "混沌"
    }
  },
}