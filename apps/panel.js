import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";
import manage from "../manage/index.js";

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
    {
      // 改名
      reg: "^改名*",
      fnc: "rename"
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
    if(!(await manage.user.add(e.user_id))) {
      await this.reply("已在游戏中！");
    }
    else {
      await this.reply("加入成功");
    }
  }

  // 查看存档
  async read_panel (e)
  {
    let user_panel = await manage.user.panel_get(e.user_id);
    let str = "";
    str += "道号：" + user_panel.name + "\n";
    str += "道宣：" + user_panel.daoxuan + "\n";
    str += "修为：" + user_panel.xiuwei + "\n";
    str += "灵石：" + user_panel.lingshi + "\n";
    str += "修炼速度：" + user_panel.xiuliansudu + "/5s\n";
    str += "血量：" + user_panel.hp + "\n";
    str += "防御力：" + user_panel.fangyuli + "\n";
    str += "攻击：" + user_panel.atk + "\n";
    str += "暴击率：" + user_panel.baojilv + "%\n";
    str += "暴伤：" + user_panel.baoshang + "%\n";
    str += "气运：" + user_panel.qiyun + "\n";
    str += "门派：" + user_panel.menpai + "\n";
    str += "阵营：" + user_panel.zhenying + "\n";
    str += "境界：" + user_panel.jingjie + "\n";
    str += "武器：" + user_panel.wuqi + "\n";
    str += "法宝：" + user_panel.fabao + "\n";
    str += "衣服：" + user_panel.yifu + "\n";
    str += "裤子：" + user_panel.kuzi + "\n";

    await this.reply(str);
  }

  // 改名
  async rename(e){
    // 剔除命令前缀
    let reg = new RegExp("^" + config.cmd_pre);
    let new_name = e.msg.replace(reg, "");
    // 剔除命令文本
    reg = new RegExp("^改名");
    new_name = new_name.replace("改名", "");

    await manage.user.name_edit(e.user_id, new_name);
  }
}
