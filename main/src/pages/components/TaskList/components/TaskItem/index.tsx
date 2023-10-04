import moment from 'moment';
import React from 'react'
import './index.less'

interface IProps {
    title: string;
    desc: string;
    startTime?: string;
    endTime: moment.Moment;
    status?: "doing" | "done";
    active: boolean;
    onFinish: () => void;
    onDelete: () => void;
}
export default function TaskList(props: IProps) {
    const { title, desc, startTime, endTime, status, active = false, onDelete, onFinish } = props;
    return (
        <div className="task-item ${active ? 'task-item-active' : ''}">
            <div className="task-item-info">
                <div className="task-item-title">{title}</div>
                <div className="task-item-desc">{desc}</div>
            </div>
            <div className="task-item-status">
                <div className="task-item-ddl">{endTime.format('YYYY-MM-DD HH:mm:ss')}</div>
                <div>
                    <button className="task-item-finish-btn" onClick={onFinish}>完成</button>
                    <button className="task-item-more-btn" onClick={onDelete}>删除</button>
                </div>
            </div>
        </div>
    )
}
