import React, { FC, useState } from 'react'
import { PlusIcon } from '@/components/icon/index';
import { Button, DatePicker, Input, message, Tag } from 'antd';
import config from '@/pages/components/TaskList/config'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment';
import { postApi } from '@/api/index';
import apiConfig from '@/api/config';
import './index.less';

interface TaskCreatorProps{
    getLatestList: () => void
}

const TaskCreator: FC<TaskCreatorProps> = ({ getLatestList }) => {
    const [isCreate, setIsCreate] = useState(false);
    const [curTitle, setCurTitle] = useState('');
    const [ddl, setDDL] = useState(moment());
    const onChange = (date:any, dateString:string) => {
        setDDL(date);
    }
    const onClickDate = (offset: number) => {
        const today = new Date();
        const date = new Date(today.getTime() + offset * 24 * 60 * 60 * 1000)
        const dateTime = date.toLocaleDateString().split('/').join('-')+' 18:00:00';
        const momentDate = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
        setDDL(momentDate)
      }
    const onCancelTask = () => {
        setIsCreate(false);
        setCurTitle('');
    }
    // 创建任务
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
    return (
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
    )
}

export default TaskCreator;