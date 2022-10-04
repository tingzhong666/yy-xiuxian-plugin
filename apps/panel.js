import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";
import Game_panel from "../game/panel.js";
import jingjie from "../data/setup/jingjie.js"

const cmd_cfg =
{
  name: "个人面板",
  dsc: "个人面板",
  event: "message",
  priority: 500,
  rule: [
    {
      // 注册游戏
      reg: "^加入修仙$",
      fnc: "register"
    },
    {
      // 查看存档
      reg: "^查看信息$",
      fnc: "read_panel"
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


export class panel extends plugin
{
  constructor (e)
  {
    super(cmd_cfg)
  }

  // 加入游戏
  async register (e)
  {
    let game_panel = new Game_panel(e);
    if(!(await game_panel.play())) {
      this.reply("已在游戏中！");
    }
    else {
      this.reply("加入成功");
    }
  }

  // 查看存档
  async read_panel (e)
  {
    let game_panel = new Game_panel(e.user_id);
    let str = "";

    Object.keys(game_panel.data).forEach(v => {
      if(game_panel.data[v].name == "境界")
      {
        str += `${game_panel.data[v].name}：${jingjie[game_panel.data[v].value].name}\n`;
        return;
      }

      str += `${game_panel.data[v].name}：${game_panel.data[v].value}\n`;
    });
    
    // logger.info(game_panel)

    this.reply(str);
  }
}
