import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";
import manage from "../manage/index.js";
import init from "../init/index.js"

const cmd_cfg =
{
  name: "管理",
  dsc: "管理",
  event: "message",
  priority: 500,
  rule: [
    {
      // 初始化
      reg: "^初始化$",
      fnc: "_init"
    },
    {
      // 数据库清空
      reg: "^数据清空$",
      fnc: "clear"
    },
    {
      // 数据库与用户数据一并清空
      reg: "^全部数据清空$",
      fnc: "clear_all"
    },
  ]
};

// 命令前缀
if(config.cmd_pre_mode)
{
  cmd_cfg.rule.forEach(v =>
    {
      v.reg.replace("^", "^" + config.cmd_pre);
    });
}


export class admin extends plugin
{
  constructor (e)
  {
    super(cmd_cfg)
  }

  // 初始化
  async _init (e)
  {
    await this.reply("初始化中...");
    await init.run();
    await this.reply("初始化完成！");
  }
  // 数据库清空
  async clear (e)
  {
    await this.reply("数据库清空中...");
    await init.clear();
    await this.reply("数据库清空完成！");
  }
  // 数据库与用户数据一并清空
  async clear_all (e)
  {
    await this.reply("数据库与用户数据一并清空中...");
    await init.clear(true);
    await this.reply("数据库与用户数据一并清空完成！");
  }
}
