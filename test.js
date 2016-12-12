var path = require('path');
var readDir = require('./a')

readDir(path.join(__dirname, './dept'), function (_list) {
    console.log(_list);
    
    readDir(path.join(__dirname, './dept'), function (_list) {
        console.log(_list);
    });
});