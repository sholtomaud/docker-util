module.exports = function () {
  fs.copy(path.join(__dirname, '/temp/'), packageDir, function (err) {
    if (err) return console.error(err)
    console.log('success!')
  })
}
