var express = require('express');
const fs = require('fs');
const path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 创建接口
router.post('/create', function(req, res, next) {
  // __dirname: C:\program\todo-workbench\app\server\routes
  // path.join(__dirname, '..') C:\program\todo-workbench\app\server
  const dbPath = path.join(__dirname, '..', 'db')
  const newTask = req.body // 传入的是对象
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
      newData = JSON.stringify([...JSON.parse(data), newTask])
    } else {
      newData = JSON.stringify([newTask])
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

// 删除接口
router.post('/delete', function(req, res, next) {
  const taskID = req.body.taskID // 传入的是对象
  if(!taskID){
    res.send({
      data: [],
      code: 0,
      msg: 'taskID非法'
    });
    return;
  }

  // __dirname: C:\program\todo-workbench\app\server\routes
  // path.join(__dirname, '..') C:\program\todo-workbench\app\server
  const dbPath = path.join(__dirname, '..', 'db')
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

    // 寻找taskID对于的数据
    let newDataObj = null;
    if(data){
      const dataObj = JSON.parse(data)
      newDataObj = dataObj.filter(item => item.taskID != taskID)
    }

    // 新数据（数据格式转换）
    let newData = newDataObj ? JSON.stringify(newDataObj) : null;

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
        data: taskID,
        code: 1,
        msg: 'delete successfully'
      });
      return
    });
  });
});

// 查询接口
router.get('/list', function(req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = `${dbPath}\\DOING.json`
  // 读取文件
  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    let newData
    if(data){
      newData = JSON.parse(data)
    } else {
      newData = []
    }
    res.send({
      data: newData,
      code: 1,
      msg: 'file written successfully'
    });
    return
  });
})

module.exports = router;
