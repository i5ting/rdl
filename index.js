'use strict';

var fs = require('fs')
var path = require('path')

var list = []
var count = 0

var rdl = function (dir, cb) {
  if (/\.git/.test(dir)) {
    // console.log(dir)
    return ;
  }
  
  count++
  try {
    fs.readdir(dir, function (err, files) {
      // console.log(dir + files)
      if (err) {
        console.log(err)
        return
      }
      files.forEach(function (file, i) {
        var stat = fs.lstatSync(path.join(dir, file))
        if (stat.isFile()) {  
          list.push(path.join(dir, file))
        } else if (stat.isDirectory()) {
          try {
            rdl(path.join(dir, file), cb)
          } catch (error) {
            console.log(error)
          }
        }

        if ((i + 1) === files.length) {
          count--
        }

        // console.log(count)
        // console.log(file + ' ' + count)
        if(count === 0){
          // console.log(file + ' ' + count)
          cb(list)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = function(dir) {
  if (count === 0){
    list = []
  }

  return new Promise(function(resolve, reject){  
    rdl(dir, function(resultArray) {
      resolve(resultArray)
    })
  })
}
