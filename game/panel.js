import Panel_strut from "../data/setup/panel.js";
import com from "./com.js";
import config from "../config.js"

export default class Panel extends Panel_strut  {
  constructor(qq) {
    super();
    this.qq = qq;
  }

  qq = 0;

  // 导入存档
  async import_data() {
    this.data = await com.json.read(config.yy_data_path)[this.qq];
  }

  // 保存存档
  async export_data() {
    let res = await com.json.read(config.yy_data_path);
    res[this.qq] = this.data;
    await com.json.write(config.yy_data_path, res);
  }

  // 是否加入游戏
  async check() {
    let res = await com.json.read(config.yy_data_path)[this.qq];

    return res ? true : false;
  }
  // 加入游戏
  async play() {
    // 已经加入过了
    if(await this.check()) return false;
    else {
      await this.export_data();
      return true;
    }
  }
}