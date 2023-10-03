import moment from 'moment';
import React from 'react'
import './index.less'

interface IProps {
    title: string;
    desc: string;
    startTime?: string;
    endTime: moment.Moment;
    status?: "doing" | "done";
}
export default function TaskList(props: IProps) {
    const { title, desc, startTime, endTime, status } = props;
    return (
        <div className="task-item">
            <div className="task-item-info">
                <div className="task-item-title">{title}</div>
                <div className="task-item-desc">{desc}</div>
            </div>
            <div className="task-item-status">
                <div className="task-item-ddl">{endTime.format('YYYY-MM-DD HH:mm:ss')}</div>
                <button className="task-item-finish-btn">
                    完成
                </button>
            </div>
        </div>
    )
}
