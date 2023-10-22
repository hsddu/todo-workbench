import moment from 'moment';
import React from 'react'
import './index.less'
import { MENU_KEY } from '@/const/index'

interface IProps {
    title: string;
    desc: string;
    startTime?: string;
    endTime: moment.Moment;
    status?: number;
    active: boolean;
    onFinish: () => void;
    onDelete: () => void;
    onClick: () => void;
}
export default function TaskList(props: IProps) {
    const { title, desc, startTime, endTime, status, active = false, onDelete, onFinish, onClick } = props;
    return (
        <div className="task-item ${active ? 'task-item-active' : ''}">
            <div className="task-item-info" onClick={onClick}>
                <div className="task-item-title">{title}</div>
                {/* <div className="task-item-desc">{desc}</div> */}
                <div className="task-item-ddl">
                    <span>截止时间：{endTime.format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
            </div>
            <div className="task-item-status">
                <div>
                    <button className="task-item-finish-btn" onClick={onFinish}>{status==MENU_KEY.DOING ? '完成':'继续'}</button>
                </div>
                <div>
                    <button className="task-item-delete-btn" onClick={onDelete}>删除</button>
                </div>
            </div>
        </div>
    )
}
