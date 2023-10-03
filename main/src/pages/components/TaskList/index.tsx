import React, { useState } from 'react'
import './index.less'
import TaskItem from './components/TaskItem'
import { DatePicker, Input, Tag, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { PlusIcon } from '@/components/icon/index';
import moment from 'moment';

interface TasksProps {
  title: string;
  desc: string;
  endTime: moment.Moment;
}

export default function TaskList() {
  const [isCreate, setIsCreate] = useState(false);
  const [ddl, setDDL] = useState(moment());
  const [curTitle, setCurTitle] = useState('');
  const [tasks, setTasks] = useState<TasksProps[]>([]);

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
    setTasks([...tasks, {title: curTitle, desc: '', endTime: ddl}]);
    setIsCreate(false);
    setCurTitle('');
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
              <Tag color='green' onClick={() => onClickDate(0)}>今天</Tag>
              <Tag color='cyan' onClick={() => onClickDate(1)}>明天</Tag>
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
          return <TaskItem key={String(index)} title={item.title} desc={item.desc} startTime="2023-9-28" endTime={item.endTime} status='doing' />
        })}
        {/* <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' />
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
        <TaskItem title="任务一" desc="观看视频" startTime="2023-9-28" endTime='2023-9-28' status='doing' /> */}
      </div>
    </div>
  )
}
