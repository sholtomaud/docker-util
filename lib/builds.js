'use strict'

const debug = require('debug')('build')
const spawn = require('child_process').spawn

module.exports = function (config, action, program) {
  const buildDocker = spawn('docker', [`${action}`, '--force-rm', '-t', `${program.type}/node${program.node}:test`, '.'])

  buildDocker.stdout.on('data', (data) => {
    process.stdout.write(`${data}`)
  })
  buildDocker.stderr.on('data', (data) => {
    process.stdout.write(`stderr: ${data}`)
  })
  buildDocker.on('close', (code) => {
    console.log(`docu exited with code ${code}`)
    return code
  })
}
