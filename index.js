var fs = require('fs');
var path = require('path');

var list = [];
var count = 0;

module.exports = function readDir(_path, callback) {
  if (count === 0){
    list = [];
  }
    var toExec = function (_path) {
        count++;
        fs.readdir(_path, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach(function (file, i) {
                var stat = fs.lstatSync(path.join(_path, file));
                if (stat.isFile()) {
                    list.push(path.join(_path, file));
                } else if (stat.isDirectory()) {
                    toExec(path.join(_path, file));
                }

                if ((i + 1) === files.length) {
                    count--;
                }

                if(count === 0){
                    callback(list);
                }
            });
        });
    };

    toExec(_path);
};

