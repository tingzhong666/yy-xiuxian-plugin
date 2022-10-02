import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  yy_path: __dirname, // yy修仙插件路径
  yunzai_path: path.join(__dirname, '../../'), // yunzai路径
  cmd_pre: "yy", // 命令前缀
  cmd_pre_mode: 0 // 是否开启命令前缀 0 否 1 是 开启后命令必须带上前缀才会响应 是为了避免与其他游戏指令冲突
}
