const https = require('https')
const fs = require('fs')

exports.download = (url, filename) =>
  new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filename)

    const req = https.get(url, res => {
      res.pipe(stream)
      res.on('end', resolve)
      res.on('error', reject)
    })

    req.on('error', reject)
  })
