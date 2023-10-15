import React, { FC, useState, useMemo, useEffect } from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { DatePicker, Input, Tag, Button, Drawer, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { PlusIcon } from '@/components/icon/index';
import moment from 'moment';
import config from './config'
import TaskDetail from './components/TaskDetail'
import apiConfig from '@/api/config'
import { postApi, api, getApi } from '@/api/index'
import { API_RESULT, TASK_STATUS } from '@/const/index'

export interface TaskProps {
  taskID: string;
  title: string;
  desc: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  status: number;
}

interface TaskListProps {
  activeMenuKey: number
}
const TaskList: FC<TaskListProps> = ({activeMenuKey}) => {
  const [isCreate, setIsCreate] = useState(false);
  const [ddl, setDDL] = useState(moment());
  const [curTitle, setCurTitle] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState('');

  const getLatestList = () => {
    getApi(apiConfig.list.url, {activeMenuKey: activeMenuKey}).then(res => {
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
  }, [activeMenuKey])

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
    const newTask = {taskID: taskID, title: curTitle, desc: '', startime: moment(), endTime: ddl, status: 0}
    postApi(apiConfig.create.url, newTask).then(res => {
      getLatestList()
      setIsCreate(false);
      setCurTitle('');
      message.success('创建成功')
    }).catch(e => {
      message.error(e);
    })
  }
  // 完成
  const onHandleFinish = (task: TaskProps) => {
    task.status = TASK_STATUS.DONE;
    postApi(apiConfig.update.url, task).then(res => {
      if(res.code == API_RESULT.SUCCESS){
        message.success('修改成功')
        getLatestList();
      } else {
        message.error(res?.msg)
      }
    })
  }
  const onHandleDelete = (task: TaskProps) => {
    postApi(apiConfig.delete.url, {taskID: task.taskID}).then(res => {
      if(res.code == API_RESULT.SUCCESS){
        message.success('删除成功')
        getLatestList();
      } else {
        message.error(res?.msg)
      }
    })
  }
  const onHandleClick = (task: TaskProps) => {
    setActiveTaskID(task.taskID);
  }
  const onDetailSubmit = (values: TaskProps) => {
    postApi(apiConfig.update.url, values).then(res => {
      if(res.code == API_RESULT.SUCCESS){
        message.success('修改成功')
        getLatestList();
      } else {
        message.error(res?.msg)
      }
    })
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

export default TaskList;