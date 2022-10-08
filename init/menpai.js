import manage from "../manage/index.js";

export default {
  async init(){
    manage.menpai.add(this.arr);
  },

  arr: {
    mengde: {
      name: "蒙德",
      zhenying: "zhixu",
    },
    liyue: {
      name: "璃月",
      zhenying: "zhixu",
    },
    qiuqiuren: {
      name: "丘丘人",
      zhenying: "hundun",
    },
    daobaotuan: {
      name: "盗宝团",
      zhenying: "hundun",
    },
  },
}