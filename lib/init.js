'use strict'

const debug = require('debug')('init')
const fs = require('fs-extra')
const kgo = require('kgo')
const json2md = require('json2md')
const spawn = require('child_process').spawn
const path = require('path')

module.exports = function (config, dir) {
  kgo('npmInit', function (done) {
    debug('Spawning npm init')
    var npm = spawn('npm', ['init'], { stdio: 'inherit' })
    npm.on('close', function (error, data) {
      done(error, data)
    })
  })('copy', ['npmInit'], function (npm, done) {
    debug('npmInit', npm)
    var dig = path.join(dir, '/temp/')
    debug('Copying files command', dig, 'pg', config.packageDir)

    fs.copy(dig, config.packageDir, function (error) {
      done(error)
    })
  })('md', ['npmInit'], function (npm, done) {
    var pack = require(path.join(config.packageDir, '/package.json'))
    var mdob = [
      { h1: pack.name },
      { blockquote: pack.description }
    ]
    debug('md', pack)
    done(null, json2md(mdob))
  })('write', ['copy', 'md'], function (copy, md, done) {
    debug('Writing Markdown to README.md', md)
    fs.writeFile('README.md', md, function (error) {
      done(error)
    })
  })(['*'], function (err) {
    debug('Error: ' + err)
    // console.error(err.error.underline.red, err.msg)
    return
  })
}
