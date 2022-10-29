import config from "../config.js";
import plugin from '../../../lib/plugins/plugin.js';
import task_list from "../task/index.js";

const cmd_cfg =
{
  name: '定时任务',
  dsc: '定时任务',
  event: 'message',
  priority: 300,
  rule: [
  ]
};

/**
 * 定时任务
 */

export class task extends plugin {
    constructor() {
        super(cmd_cfg);
        this.task = {
            cron: "0/1 * * * * ?",
            name: "task",
            fnc: () => this.timer(),
        }
    }

    async timer(){
        task_list.task_list.forEach(async (t, i) => {
            // 如果没有 表示当前任务才进入队列
            // 则添加1个 计秒属性
            if(!t.count) t.count = t.time;
            
            t.count--;
            // 永久循环
            if(t.n == -1){
                if(t.count == 0)
                {
                    // 执行回调
                    await t.func();
                    // 计秒重置
                    t.count = t.time;
                }
            }
            else
            {
                // 有限循环
                // 次数是否用完
                if(t.n == 0)
                {
                    // 用完则从人物队列中删除
                    task_list.task_list.splice(i, 1);
                    return;
                }

                // 未用完，则先执行定时回调，再减次数,重置计秒
                t.func();
                t.n--;
                t.count = t.time;
            }
        });
    }
}
