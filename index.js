import fs from 'node:fs'

logger.info('--------------------------')
logger.info("yy修仙初始化。。。")
logger.info('--------------------------')

const files = fs
  .readdirSync('./plugins/yy-xiuxian-plugin/apps')
  .filter((file) => file.endsWith('.js'))

let apps = {}
for (let file of files) {
  let name = file.replace('.js', '')
  apps[name] = (await import(`./apps/${file}`))[name]
}

export { apps }
