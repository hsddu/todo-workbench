import React, { useEffect, useState } from 'react'
import { Drawer, Input, Form, Button, message } from 'antd';
import { TaskProps } from '@/pages/components/TaskList/index'
import QuickDatePicker from '../QuickDatePicker'
// import { DatePickerIcon, TextIcon, TitleEditIcon } from '@/components/icon'

interface TaskDetailProps {
    task?: TaskProps;
    onClose: () => void;
    onSubmit?: (values: TaskProps) => void; 
}
const TaskDetail = (props: TaskDetailProps) => {
    const { task, onClose, onSubmit } = props; // task 可能为task对象或undefined
    const [titleValue, setTitleValue] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTitleValue(task?.title || '');
        task ? setOpen(true) : setOpen(false);
    }, [task])
    
    const onInputChange = (e: any) => {
        setTitleValue(e?.target.value)
    }
    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div style={{ fontSize: '14px' }}>任务标题：</div>
                <Input value={titleValue} onChange={onInputChange} bordered={false} style={{flex: 1}}/>
            </div>
        )
    }
    const onFormFinish = (values: any) => {
        onSubmit?.({
            taskID: task?.taskID || '',
            title: titleValue || '',
            desc: values.desc || task?.desc,
            endTime: values.endTime || task?.endTime
        })
        message.success('修改成功');
        onClose()
    }
    return (
        <Drawer title={renderTitle()} placement="right" onClose={onClose} open={open} closable={false} width='530'>
            <Form onFinish={onFormFinish}>
                <Form.Item name='desc' label='任务描述'>
                    <Input.TextArea placeholder='请输入任务描述'></Input.TextArea>
                </Form.Item>
                <Form.Item name='endTime' label='截止时间' style={{ width: '100%'}}>
                    <QuickDatePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} disabled={titleValue == ''}>确认修改</Button>
                </Form.Item>
            </Form>
        </Drawer>
  )
}

export default TaskDetail;
