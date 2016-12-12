var path = require('path');
var rdl = require('./')

var dir = path.join(__dirname, './dept')

rdl(dir).then(function(r){
  console.log(r)
  return rdl(dir)
})
.then(function(r2){
  console.log(r2)
})

