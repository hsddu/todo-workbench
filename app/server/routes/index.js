var express = require('express');
const fs = require('fs');
const path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  // __dirname: C:\program\todo-workbench\app\server\routes
  // path.join(__dirname, '..') C:\program\todo-workbench\app\server
  const dbPath = path.join(__dirname, '..', 'db')
  const newTask = req.body
  const dbFile = `${dbPath}\\DOING.json`
  
  // 读取文件
  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      // 返回的响应
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }

    // 新数据
    let newData = null;
    // 注意JSON字符串和对象格式
    if(data){
      newData = JSON.stringify([JSON.parse(data), newTask])
    } else {
      newData = JSON.stringify(newTask)
    }
    // 写入文件
    fs.writeFile(dbFile, newData, err => {
      if (err) {
        res.send({
          data: [],
          code: 0,
          msg: err
        });
        return;
      }
      // file written successfully
      res.send({
        data: newTask,
        code: 1,
        msg: 'file written successfully'
      });
      return
    });
  });
});

module.exports = router;
