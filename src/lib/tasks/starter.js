const unzip = require('unzip')
const path = require('path')
const fs = require('fs')

const { download } = require('../utils/http-utils')

function unpack(template, filename, destination = './') {
  const outDir = path.resolve(destination)

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

  fs.createReadStream(filename)
    .pipe(unzip.Parse())
    .on('entry', entry => {
      const root = `${template}-starter-master/`
      const destination = entry.path.replace(root, './')
      switch (entry.type) {
        case 'File':
          entry.pipe(fs.createWriteStream(destination))
          break
        case 'Directory':
          if (entry.path !== root) {
            fs.mkdirSync(destination)
          }
          break
        default:
          break
      }
    })
    .on('close', () => {
      fs.unlinkSync(filename)
    })
}

module.exports = async (template, destination) => {
  const url = `https://codeload.github.com/tricertc/${template}-starter/zip/master`
  const filename = template + '.zip'

  await download(url, filename)
  unpack(template, filename, destination)
}
