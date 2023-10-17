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
  const status = req.body.status
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
  const dbFile = status==0 ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  
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

    // 寻找taskID对应的数据
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

// 修改接口
router.post('/update', function(req, res, next) {
  const updateTask = req.body;
  const taskID = req.body.taskID // 传入的是对象
  const status = updateTask.status;
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
  const doingFile = `${dbPath}\\DOING.json`
  const doneFile = `${dbPath}\\DONE.json`
  let doingData = null; // 待写入 doing.json文件的数据(对象数据)
  let doneData = null; // 已完成 done.json文件的数据(字符串类型)
  
  // 读取doing.json文件 
  fs.readFile(doingFile, 'utf8', (err, doingDataStr) => {
    if (err) {
      // 返回的响应
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }

    const doingDataObj = doingDataStr ? JSON.parse(doingDataStr) : null;
    console.log('++ doingData 2:', doingDataObj)
    if(status == 0){ // 进行中
      if(doingDataObj){ // doing.json 存在数据
        doingData = doingDataObj.map(item => {
          if(item?.taskID == taskID){
            item = updateTask
            return item
          }
          return item
        })
        console.log('++ doingData 3:', doingData)
      } else { // doing.json 不存在数据
        doingData = null;
      }
    } else if(status == 1){  // 已完成
      // 一、done.json文件写入updateTask
      fs.readFile(doneFile, 'utf8', (err, doneDataStr) => {
        if (err) {
          // 返回的响应
          res.send({
            data: [],
            code: 0,
            msg: err
          });
          return;
        }
        const doneDataObj = doneDataStr ? JSON.parse(doneDataStr) : [];
        doneDataObj.push(updateTask)
        doneData = doneDataObj.length ? JSON.stringify(doneDataObj) : null
        fs.writeFile(doneFile, doneData, err => {
          if (err) {
            res.send({
              data: [],
              code: 0,
              msg: err
            });
            return;
          }
        });
      })
      // 二、doing.json文件删除updateTask
      if (doingDataObj){
        doingData = doingDataObj.filter(item => item?.taskID != taskID);
      } else {
        doingData = null;
      }
    }

    // 写入doing.json文件
    console.log('++ doingData 1:', doingData)
    const doingDataStringify = doingData ? JSON.stringify(doingData) : null;
    
    fs.writeFile(doingFile, doingDataStringify, err => {
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
        data: updateTask,
        code: 1,
        msg: 'update successfully'
      });
      return
    });
  });
});

// 查询接口
router.get('/list', function(req, res, next) {
  const activeMenuKey =  req.query.activeMenuKey
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = activeMenuKey == 0 ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json` 
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
      msg: 'file read successfully'
    });
    return
  });
})

module.exports = router;
