import React from 'react'
import './index.less'
import TaskItem from './components/TaskItem'

export default function TaskList() {
  return (
    <div className="task-list">
      <h1>任务列表</h1>
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
