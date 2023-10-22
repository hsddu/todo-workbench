import React, { FC, useState, useMemo, useEffect } from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { message } from 'antd';
import moment from 'moment';
import TaskDetail from './components/TaskDetail'
import apiConfig from '@/api/config'
import { postApi, api, getApi } from '@/api/index'
import { API_RESULT, TASK_STATUS } from '@/const/index'
import TaskCreator from './components/TaskCreator/index'
import { MENU_KEY } from '@/const/index'

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
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [activeTask, setActiveTask] = useState<TaskProps | undefined>();

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


  // 完成或继续
  const onHandleFinish = (task: TaskProps) => {
    task.status = 1 - task.status
    postApi(apiConfig.update.url, {
      task,
      activeMenuKey: activeMenuKey
    }).then(res => {
      if(res.code == API_RESULT.SUCCESS){
        message.success('修改成功')
        getLatestList();
      } else {
        message.error(res?.msg)
      }
    })
  }
  const onHandleDelete = (task: TaskProps) => {
    postApi(apiConfig.delete.url, {taskID: task.taskID, status: task.status}).then(res => {
      if(res.code == API_RESULT.SUCCESS){
        message.success('删除成功')
        getLatestList();
      } else {
        message.error(res?.msg)
      }
    })
  }
  const onHandleClick = (task: TaskProps) => {
    setActiveTask(task)
  }
  const onDetailSubmit = (values: TaskProps) => {
    console.log('++ 编辑 values', values)
    postApi(apiConfig.update.url, {
      task: values, 
      activeMenuKey: activeMenuKey
    }).then(res => {
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
      {activeMenuKey == MENU_KEY.DOING && <TaskCreator getLatestList={getLatestList}/>}
      <div className="task-item-container">
        {tasks.map((item, index) => {
          return <TaskItem key={String(index)} title={item.title} desc={item.desc} startTime="2023-9-28" endTime={item.endTime} status={item.status} active={activeTask?.taskID == item.taskID} onDelete={() => onHandleDelete(item)} onFinish={() => onHandleFinish(item)} onClick={() => onHandleClick(item)}/>
        })}
      </div>
      <TaskDetail task={activeTask} onClose={() => setActiveTask(undefined)} onSubmit={onDetailSubmit}></TaskDetail>
    </div>
  )
}

export default TaskList