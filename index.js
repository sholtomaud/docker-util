#!/usr/bin/env node --harmony
var chalk = require('chalk')
var co = require('co')
var prompt = require('co-prompt')
var brogram = require('commander')
var config = require('./config.json')
var packageVersion = process.env.npm_package_version
var packageName = process.env.npm_package_name

const ASSETS = '/Users/chr/dev/' + packageName
const TARGET = '/usr/src'

const spawn = require('child_process').spawn



brogram
  .arguments('<action>')
  .option('--type <type>', 'Build a docker server or client image')
  .option('--run <run>', 'Run a docker container')
  .option('--node <node>', 'Node version')
  .option('--os <os>', 'Linux version [eg. centos7]')
  .action(function (action) {
    console.log('hello world')

    if (brogram.type) {
      // console.log(chalk.bold.cyan(' bs: %j os: %k'), build, os, packageName, packageVersion)
      console.log(chalk.bold.cyan(' bs: %j os: %k'), action, brogram.type, brogram.os, brogram.node, packageName, packageVersion)
    }
    else if (brogram.run) {
      // console.log('server')
    }
    else if (brogram.buildClient) {
        // docker build --force-rm -t "client/node"+brogram.node+" :latest" .
      const nodeVersion = brogram.node
      const docker = spawn('docker', [`build --force-rm -t client/node${nodeVersion}:latest`])

      // docker.stdout.on('data', (data) => {
      //   console.log(`stdout: ${data}`)
      // })
      // docker.stderr.on('data', (data) => {
      //   console.log(`stderr: ${data}`)
      // })
      // docker.on('close', (code) => {
      //   console.log(`child process exited with code ${code}`)
      // })
    }
    else if (brogram.runClient) {

    }
    //
    // co(function * () {
    //   var username = yield prompt('username: ')
    //   var password = yield prompt.password('password: ')
    //   console.log(chalk.bold.cyan('user: %s pass: %s file: %s'),
    //     username, password, file)
    // })
  })
  .parse(process.argv)


  // IMAGE_NAME='client/node6:latest'
  // CONTAINER_NAME="${npm_package_name}_${npm_package_version}"
  // WEBSITE_ASSETS="/Users/chr/dev/${npm_package_name}/build"
  // WEBSITE_TARGET="/usr/src/app"
  //
  // docker stop ${CONTAINER_NAME}
  // docker rm ${CONTAINER_NAME}
  //
  // if [[ ${OPTIONS} == '--build' ]]; then
  //     docker build --force-rm -t ${IMAGE_NAME} .
  // fi
  //
  // if [[ ${OPTIONS} == '--watch' ]]; then
  //     docker run -v ${WEBSITE_ASSETS}:${WEBSITE_TARGET} -p 49162:8000 --name ${CONTAINER_NAME} -t ${IMAGE_NAME}
  // fi
