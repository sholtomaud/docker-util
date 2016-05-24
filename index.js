#!/usr/bin/env node --harmony
const brogram = require('commander')
const packageVersion = process.env.npm_package_version
const packageName = process.env.npm_package_name
const spawn = require('child_process').spawn
const ASSETS = '/Users/chr/dev/' + packageName
const TARGET = '/usr/src'
const CONTAINER_NAME = packageName + '-' + packageVersion

brogram
  .arguments('<action>')
  .option('--type <type>', 'type: <client,server>')
  .option('--node <node>', 'Node version')
  .option('--os <os>', 'Linux version [eg. centos7]')
  .option('--dockerfile <dockerfile>', 'Linux version [eg. centos7]')
  .action(function (action) {
    switch (action.trim()) {
      case 'build':
        const buildDocker = spawn('docker', [`${action}`, '--force-rm', '-t', `${brogram.type}/node${brogram.node}:test`, '.'])
        buildDocker.stdout.on('data', (data) => {
          process.stdout.write(`${data}`)
        })
        buildDocker.stderr.on('data', (data) => {
          process.stdout.write(`stderr: ${data}`)
        })
        buildDocker.on('close', (code) => {
          console.log(`docu exited with code ${code}`)
        })
        break
      case 'run':
        spawn('docker', ['stop', `${CONTAINER_NAME}`])
        spawn('docker', ['rm', `${CONTAINER_NAME}`])
        const runDocker = spawn('docker', [`${action}`, '-v', `${ASSETS}/${brogram.type}:${TARGET}/${brogram.type}`, '-p', '49164:8000', '--name', `${CONTAINER_NAME}`, '-t', `${brogram.type}/node${brogram.node}:test`])
        runDocker.stdout.on('data', (data) => {
          process.stdout.write(`${data}`)
        })
        runDocker.stderr.on('data', (data) => {
          process.stdout.write(`stderr: ${data}`)
        })
        runDocker.on('close', (code) => {
          console.log(`docu exited with code ${code}`)
        })
        break
      case 'clean':
        const cleanDocker = spawn('docker', ['images', '-a'])
        const grep = spawn('grep', ['^<none>'])
        const awk = spawn('grep', ['{print $3}'])
        const xargs = spawn('xargs', ['docker', 'rmi'])

        cleanDocker.stdout.pipe(grep.stdin)
        grep.stdout.pipe(awk.stdin)
        awk.stdout.pipe(xargs.stdin)
        break

      default:

    }
  })
  .parse(process.argv)
