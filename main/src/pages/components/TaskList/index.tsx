import React, { useState } from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { DatePicker, Input } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { PlusIcon } from '@/components/icon/index';

export default function TaskList() {
  const [isCreate, setIsCreate] = useState(false);
  const onChange = (date:any, dateString:string) => {
    console.log('++ onChange:', date, dateString);
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
            onBlur={() => setIsCreate(false)}
          />
        </div>
        { isCreate && <div>12312</div> }
      </div>
      {/* <DatePicker locale={locale} showTime onChange={onChange} placeholder='选择任务截止日期'/> */}
      <div className="task-item-container">
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
      </div>
    </div>
  )
}
