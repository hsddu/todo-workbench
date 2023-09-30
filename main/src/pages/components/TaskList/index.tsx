import React from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

export default function TaskList() {
  const onChange = (date:any, dateString:string) => {
    console.log('++ onChange:', date, dateString);
  }
  return (
    <div className="task-list">
      <h1>任务列表</h1>
      <DatePicker locale={locale} showTime onChange={onChange} placeholder='选择任务截止日期'/>
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
