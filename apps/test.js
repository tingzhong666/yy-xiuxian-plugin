import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";

const cmd_cfg =
{
  name: "测试",
  dsc: "测试",
  event: "message",
  priority: 500,
  rule: [
    {
      reg: "^test$",
      fnc: "test"
    }
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


export class test extends plugin
{
  constructor (e)
  {
    super(cmd_cfg)
  }

  async test ()
  {
    await this.reply("666 ");
  }
}
