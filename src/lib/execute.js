const starter = require('./tasks/starter')

module.exports = (task, taskArgs) => {
  let runner

  switch (task) {
    case 'starter':
      runner = starter
      break
    default:
      break
  }

  if (runner) {
    return runner(...taskArgs)
  }

  console.log(`Task ${task} not valid.`)
}
