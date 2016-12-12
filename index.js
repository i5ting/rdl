var fs = require('fs')
var path = require('path')

var list = []
var count = 0

var rdl = function (dir, cb) {
  count++
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err)
      return
    }
    files.forEach(function (file, i) {
      var stat = fs.lstatSync(path.join(dir, file))
      if (stat.isFile()) {
          list.push(path.join(dir, file))
      } else if (stat.isDirectory()) {
          rdl(path.join(dir, file), cb)
      }

      if ((i + 1) === files.length) {
          count--
      }

      if(count === 0){
          cb(list)
      }
    })
  })
}

module.exports = function(dir, cb) {
  if (count === 0){
    list = []
  }
    
  rdl(dir, cb)
}
