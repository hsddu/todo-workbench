import React, { useState, useMemo, useEffect } from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { DatePicker, Input, Tag, Button, Drawer, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { PlusIcon } from '@/components/icon/index';
import moment from 'moment';
import config from './config'
import TaskDetail from './components/TaskDetail'
import apiConfig from '@/api/config'
import { postApi, api } from '@/api/index'
import API_RESULT from '@/const/index'

export interface TaskProps {
  taskID: string;
  title: string;
  desc: string;
  endTime: moment.Moment;
}

export default function TaskList() {
  const [isCreate, setIsCreate] = useState(false);
  const [ddl, setDDL] = useState(moment());
  const [curTitle, setCurTitle] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState('');

  const getLatestList = () => {
    api(apiConfig.list.url).then(res => {
      if(res.code == API_RESULT.SUCCESS) {
        // 打印接口响应数据
        const handleTasks = res.data.map((item:any) => {
          item.endTime = moment(item?.endTime)
          return item
        })
        setTasks(handleTasks)
      }
    })
  }

  // 获取列表数据
  useEffect(() => {
    getLatestList()
  }, [])

  const activeTask = useMemo(() => {
    return tasks.find((item) => item.taskID == activeTaskID)
  }, [tasks, activeTaskID])

  const onClickDate = (offset: number) => {
    const today = new Date();
    const date = new Date(today.getTime() + offset * 24 * 60 * 60 * 1000)
    const dateTime = date.toLocaleDateString().split('/').join('-')+' 18:00:00';
    const momentDate = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
    setDDL(momentDate)
  }
  const onChange = (date:any, dateString:string) => {
    setDDL(date);
  }
  const onCancelTask = () => {
    setIsCreate(false);
    setCurTitle('');
  }
  const onCreateTask = () => {
    const taskID = Date.now().toString();
    const newTask = {taskID: taskID, title: curTitle, desc: '', endTime: ddl}
    postApi(apiConfig.create.url, newTask).then(res => {
      console.log('++ 创建', res)
      getLatestList()
      setIsCreate(false);
      setCurTitle('');
      message.success('创建成功')
    }).catch(e => {
      console.log(e);
    })
  }
  const onHandleFinish = (task: TaskProps) => {
    const tasksUnfinish = tasks.filter(item => item.taskID != task.taskID);
    setTasks([...tasksUnfinish]);
  }
  const onHandleDelete = (task: TaskProps) => {
    const taskUnDelete = tasks.filter(item => item.taskID != task.taskID)
    setTasks([...taskUnDelete]);
  }
  const onHandleClick = (task: TaskProps) => {
    setActiveTaskID(task.taskID);
  }
  const onDetailSubmit = (values: TaskProps) => {
    const tasksUnChange = tasks.filter(item => item.taskID != values.taskID);
    setTasks([...tasksUnChange, values])
  }
  return (
    <div className="task-list">
      <h1 className='task-list-title'>任务列表</h1>
      <div className="add-task-container">
        <div className="standard-container">
          <PlusIcon></PlusIcon>
          <Input 
            className='add-task-container-input'
            placeholder='创建任务' 
            onFocus={() => setIsCreate(true)}
            value={curTitle}
            onChange={(e) => { setCurTitle(e.target.value); }}
          />
        </div>
        { isCreate && 
          <div className='time-create-row'>
            <div className='time-tags'>
              {
                config.map( item => {
                  return <Tag key={item.offset} color={item.color} onClick={() => onClickDate(item.offset)}>{item.title}</Tag>
                })
              }
              <DatePicker locale={locale} showTime value={ddl} onChange={onChange} placeholder='选择任务截止日期' size="small"/>
            </div>
            <div>
              <Button size='small' onClick={() => onCancelTask()} style={{ marginRight: '5px'}}>取消</Button>
              <Button type='primary' size='small' onClick={() => onCreateTask()} disabled={curTitle==''}>创建</Button>
            </div>
          </div>
        }
      </div>
      <div className="task-item-container">
        {tasks.map((item, index) => {
          return <TaskItem key={String(index)} title={item.title} desc={item.desc} startTime="2023-9-28" endTime={item.endTime} status='doing' active={activeTaskID == item.taskID} onDelete={() => onHandleDelete(item)} onFinish={() => onHandleFinish(item)} onClick={() => onHandleClick(item)}/>
        })}
      </div>
      <TaskDetail task={activeTask} onClose={() => { setActiveTaskID('')}} onSubmit={onDetailSubmit}></TaskDetail>
    </div>
  )
}
