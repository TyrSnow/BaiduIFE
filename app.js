'use strict';

var express = require('express');
var fs = require('fs');
var PORT = 4000;

var app = express();
app.use(express.static('./pages')); // 将pages文件夹下的页面展示出去
app.get('/', function (req, res) {
  // 读取pages下面的文件夹名，反馈回去
  var strRes = 'Static Server running success.<br>Pages we have are follow:<br>';
  fs.readdir('./pages', function (err, folders) {
    if (err) {
      strRes+= 'System Error!';
    } else {
      folders.map(function (folder) {
        strRes+= '<a href="' + folder + '/index.html">' + folder + '</a><br>'
      });
    }
    res.send(strRes);
  })
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
