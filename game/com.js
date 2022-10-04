import fs from "node:fs/promises"

export default {
  json: {
    async read(_path) {
      let res = await fs.readFile(_path);
      return JSON.parse(res);
    },
    async write(_path, data) {
      let res = JSON.stringify(data);
      await fs.writeFile(_path, res);
    }
  }
}