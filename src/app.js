const execute = require('./lib/execute')

const args = process.argv.splice(2)

const task = args[0]
const taskArgs = args.splice(1)

execute(task, taskArgs)
