import model from "../model/index.js"

export default {
  /**
   * task_list[index].time Number 时间 s
   * task_list[index].n Number 次数 循环几次 -1表示永久循环 
   * task_list[index].func 到时执行的函数 
   */
  task_list: [
    // 修炼
    {
      time: 5,
      n: -1,
      async func(){
        let user_id_arr = await model.user.list.query();
        user_id_arr.forEach(async user_id => {
          // 获取信息
          let user = await model.user.detail.query(user_id);
          // 增加修为
          await model.user.detail.edt(user_id, { xiuwei: (user.xiuwei*1 || 0) + (user.xiuliansudu*1 || 0) });
        });
      }
    }
  ],
}