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
  .option('-t','--type <type>', 'type: <client,server>')
  .option('-n' '--node <node>', 'Node version')
  .option('-o', '--os <os>', 'Linux version [eg. centos7]')
  .option('-f', '--dockerfile <dockerfile>', 'Linux version [eg. centos7]')
  .option('-d', '--devPort <devPort>', 'Port that the container will run at in dev environment [eg. 49164]')
  .option('-c', '--containerPort <containerPort>', 'Port that the container will run at [eg. 8080]')
  .option('-c', '--containerPort <containerPort>', 'Port that the container will run at [eg. 8080]')
  .action(function (action) {
    var devPort = brogram.devPort || autoPort()
    var containerPort = brogram.containerPort || '8080'
    var os = brogram.os || 'centos7'

    switch (action.trim()) {
      case 'builds':
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
        const runDocker = spawn('docker', [`${action}`, '-v', `${ASSETS}/${brogram.type}:${TARGET}/${brogram.type}`, '-p', `${devPort}:${containerPort}`, '--name', `${CONTAINER_NAME}`, '-t', `${brogram.type}/node${brogram.node}:test`])
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


function autoPort(){
    const info = spawn('docker', ['info'])
    console.log(info)
    // info.stdout.pipe(grep.stdin)
    // var containers =
}
