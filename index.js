#!/usr/bin/env node --harmony
'use strict'

const fs = require('fs-extra')
const debug = require('debug')('docu')
// const config = require('./config')
const program = require('commander')
const path = require('path')
const packageDir = process.cwd()
const lib = require('./lib')
var conf = {}
conf.packageDir = packageDir

fs.exists(path.join(packageDir, '/package.json'), function (exists) {
  if (exists) conf.pack = require(path.join(packageDir, '/package.json'))
})

program
  .arguments('<action>')
  .option('-t', '--type <type>', 'type: <client,server>')
  .option('-n', '--node <node>', 'Node version')
  .option('-o', '--os <os>', 'Linux version [eg. centos7]')
  .option('-f', '--dockerfile <dockerfile>', 'Linux version [eg. centos7]')
  .option('-d', '--devPort <devPort>', 'Port that the container will run at in dev environment [eg. 49164]')
  .option('-c', '--containerPort <containerPort>', 'Port that the container will run at [eg. 8080]')
  .option('-p', '--packageDir <package>', 'Directory where package.json can be found. Defaults to current directory')
  .action(function (action) {
    switch (action.trim()) {
      case 'init': lib.init(conf, __dirname)
        break
      case 'build': lib.build(conf, action, program)
        break
      case 'run': lib.run(conf, action, program)
        break
      case 'clean': lib.clean()
        break
      default:
    }
  })
  .parse(process.argv)
