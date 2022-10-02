import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";
import fs from "node:fs/promises";
import path from "node:path";

const cmd_cfg =
{
  name: "个人面板",
  dsc: "个人面板",
  event: "message",
  priority: 500,
  rule: [
    {
      // 注册游戏
      reg: "^register$",
      fnc: "register"
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


export class panel extends plugin
{
  constructor (e)
  {
    super(cmd_cfg)
  }

  async register ()
  {
    let res = await fs.readFile(path.join(config.yy_path, "./data/player/player.json"));
    res = JSON.parse(res);
    res.push(1);
    res = JSON.stringify(res);
    await fs.writeFile(path.join(config.yy_path, "./data/player/player.json"), res);
    await this.reply("register");
  }
}
