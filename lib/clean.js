'use strict'

const debug = require('debug')('build')
const spawn = require('child_process').spawn

module.exports = function (config, action, program) {
  const cleanDocker = spawn('docker', ['images', '-a'])
  const grep = spawn('grep', ['^<none>'])
  const awk = spawn('grep', ['{print $3}'])
  const xargs = spawn('xargs', ['docker', 'rmi'])

  cleanDocker.stdout.pipe(grep.stdin)
  grep.stdout.pipe(awk.stdin)
  awk.stdout.pipe(xargs.stdin)
  return
}
