import config from "../config.js";
import plugin from "../../../lib/plugins/plugin.js";
import manage from "../manage/index.js";
import com from "./com.js";

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
    {
      // 境界列表
      reg: "^境界列表",
      fnc: "jingjie_list_get"
    },
    {
      // 突破
      reg: "^突破",
      fnc: "jingjie_tupo"
    },
    {
      // 展开具体面板数值
      reg: "^查看信息详情",
      fnc: "panel_detail_get"
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
    str += "暴击率：" + (user_panel.baojilv*100) + "%\n";
    str += "暴伤：" + (user_panel.baoshang*100) + "%\n";
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
    com.cmd_pre_del(e.msg, "改名");

    await manage.user.name_edit(e.user_id, new_name);
  }

  // 境界列表
  async jingjie_list_get(){
    let res = await manage.jingjie.list();
    let str = "";

    res.forEach(v => {
      str += v.name + "  突破所需修为: " + v.xiuwei + "\n";
    })

    await this.reply(str);
  }

  // 突破
  async jingjie_tupo(e){
    let res = await manage.user.jingjie_tupo(e.user_id);
    if(res == -1)
    {
      let jingjie = (await manage.user.panel_get(e.user_id)).jingjie;
      await this.reply("突破成功,当前境界为：" + jingjie);
    }
    else
    {
      await this.reply("修为不够，还差" + res);
    }
  }

  // 展开面板具体数值
  async panel_detail_get(e){
    let user = await manage.user.detail_get(e.user_id);
    let str = "";
    str += "道号：" + user.name + "\n";
    str += "道宣：" + user.daoxuan + "\n";
    str += "修为：" + user.xiuwei + "\n";
    str += "灵石：" + user.lingshi + "\n";
    str += "修炼速度：" + user.xiuliansudu + "/5s\n";
    str += "血量：" + user.hp + "\n";
    str += "防御力：" + user.fangyuli + "\n";
    str += "攻击：" + user.atk + "\n";
    str += "暴击率：" + (user.baojilv*100) + "%\n";
    str += "暴伤：" + (user.baoshang*100) + "%\n";
    str += "气运：" + user.qiyun + "\n";

    // 展开数值
    str += "==门派：" + (user.menpai.name || "") + "\n";
    com.attr_handle(user.menpai).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==阵营：" + (user.zhenying.name || "") + "\n";
    com.attr_handle(user.zhenying).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==境界：" + user.jingjie.name + "\n";
    com.attr_handle(user.jingjie).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==武器：" + user.wuqi.name + "\n";
    com.attr_handle(user.wuqi).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==法宝：" + user.fabao.name + "\n";
    com.attr_handle(user.fabao).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==衣服：" + user.yifu.name + "\n";
    com.attr_handle(user.yifu).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });
    str += "==裤子：" + user.kuzi.name + "\n";
    com.attr_handle(user.kuzi).forEach(v => {
      if(v.key == "baojilv" || v.key == "baoshang")
      {
        str += v.name + ": +" + (v.value*100) + "%\n";
        return;
      }
      str += v.name + ": +" + v.value + "\n";
    });

    await this.reply(str);
  }
}
