'use strict'

const debug = require('debug')('init')
const fs = require('fs-extra')
const kgo = require('kgo')
const json2md = require('json2md')
const spawn = require('child_process').spawn

module.exports = function (config, dir) {
  kgo('npmInit', function (done) {
    spawn('npm', ['init'], function (error) {
      done(error)
    })
  })('copy', ['npmInit'], function (npm, done) {
    debug('Copying files command')
    fs.copy(path.join(dir, '/temp/'), config.packageDir, function (error) {
      done(error)
    })
  })('md', ['npmInit'], function (npm, done) {
    var json = []
    // var { h1: "JSON To Markdown" };
    var error = 'hi'
    // json.push()
    // json2md
    done(error)
  })('write', ['copy', 'md'], function (copy, md, done) {
    debug('Writing to README.md')
    fs.writeFile('README.md', md, function (error) {
      done(error)
    })
  })(['*'], function (err) {
    debug('Error: ' + err.error)
    // console.error(err.error.underline.red, err.msg)
    return
  })
}
