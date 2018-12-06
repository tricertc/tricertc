const unzip = require('unzip')
const path = require('path')
const fs = require('fs')

const { download } = require('../utils/http-utils')

function unpack(template, filename, outdir = './') {
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir)
  }

  fs.createReadStream(filename)
    .pipe(unzip.Parse())
    .on('entry', entry => {
      const root = `${template}-starter-master/`
      const destination = entry.path.replace(root, path.resolve(outdir) + '/')
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
      console.log(`Installed ${template} starter template to ${path.resolve(outdir)}`)
    })
}

module.exports = async (template, outdir) => {
  const url = `https://codeload.github.com/tricertc/${template}-starter/zip/master`
  const filename = template + '.zip'

  await download(url, filename)
  unpack(template, filename, outdir)
}
