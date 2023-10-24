var express = require('express');
const fs = require('fs');
const path = require('path')
var router = express.Router();
const { updateDBFile } = require('../utils.js');

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
  let c1, c2;
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

  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = status==0 ?  `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  updateDBFile(dbFile, {
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onReadOver: (data) => {
      c1 = data
      const removeTarget = data.find(item => item.taskID == taskID)
      if(!data.length || !removeTarget){
        res.send({
          data: [],
          code: 0,
          msg: "无效任务ID"
        })
        return;
      }
      const newData = data.filter(item => item.taskID != taskID)
      c2 = newData
      return newData;
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onWriteOver: () => {
      res.send({
        data: {dbFile:dbFile, c2: {...c2}, s: JSON.stringify(c2)},
        code: 1,
        msg: 'write over, success delete'
      })
    }
  })
});

// 修改接口
router.post('/update', function(req, res, next) {
  const updateTask = req.body.task;
  const taskID = updateTask.taskID // 传入的是对象
  const activeMenuKey = req.body.activeMenuKey

  let resData
  if(!taskID){
    res.send({
      data: [],
      code: 0,
      msg: 'taskID非法'
    });
    return;
  }
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = activeMenuKey==0 ?  `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  console.log('+++ dbFile:', dbPath, dbFile);
  updateDBFile(dbFile, {
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onReadOver: (data) => {
      resData = data;
      const target = data.find(item => item.taskID == taskID)
      if(target.status == updateTask.status){ // 当前列表项更新
        Object.assign(target, updateTask)
        return data
      } else { // 当前列表项存放在另一个列表中
        const otherData = data.filter(item => item.taskID != taskID) 
        const changeData = data.find(item => item.taskID == taskID)
        Object.assign(target, updateTask)
        const changeDBFile = updateTask.status==0 ?  `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
        updateDBFile(changeDBFile, {
          onReadError: (err) => {
            res.send({
              data: [],
              code: 0,
              msg: err
            });
          },
          onReadOver: (rdData) => {
            rdData.push(changeData);
            return rdData
          },
          onWriteError: (err) => {
            res.send({
              data: [],
              code: 0,
              msg: err
            });
          },
          onWriteOver: () => {
          }
        })
        return otherData
      }

      if(!data.length || !removeTarget){
        res.send({
          data: [],
          code: 0,
          msg: "无效任务ID"
        })
        return;
      }
      const newData = data.filter(item => item.taskID != taskID)
      return newData;
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onWriteOver: () => {
      res.send({
        data: [dbPath, dbFile, resData],
        code: 1,
        msg: 'write over, success'
      })
    },
    // onWriteOver: () => {
    //   res.send({
    //     data: [],
    //     code: 1,
    //     msg: 'write over, success'
    //   })   
    // }
  })
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

// 数量接口
router.get('/count', function(req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFileList = [`${dbPath}\\DOING.json`, `${dbPath}\\DONE.json`] 
  const result = {};
  // 读取文件
  fs.readFile(dbFileList[0], 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    result["doing"] = JSON.parse(data).length
    fs.readFile(dbFileList[1], 'utf8', (err, readData) => {
      if (err) {
        res.send({
          data: [],
          code: 0,
          msg: err
        });
        return;
      }
      result["done"] = JSON.parse(readData).length
      res.send({
        data: result,
        code: 1,
        msg: 'file read successfully'
      });
      return
    })
  });
})

module.exports = router;
