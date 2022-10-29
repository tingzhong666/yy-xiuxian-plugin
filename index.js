import fs from 'node:fs';

logger.info('--------------------------');
logger.info("yy修仙");
logger.info('--------------------------');

const files = fs
  .readdirSync('./plugins/yy-xiuxian-plugin/apps')
  .filter((file) => file.endsWith('.js'));

let apps = {};
for (let file of files) {
  let name = file.replace('.js', '');
  if (name == "com") continue;
  apps[name] = (await import(`./apps/${file}`))[name];
}

export { apps }
