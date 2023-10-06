import React from 'react'
import { DatePicker, Tag } from 'antd';
import config from '../../config'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment';

interface QuickDatePickerProps {
    value?: moment.Moment;
    onChange?: (value: moment.Moment | null) => void;
}
const QuickDatePicker = (props: QuickDatePickerProps) => {
    const { value, onChange } = props;
    const onClickDate = (offset: number) => {
        const today = new Date();
        const date = new Date(today.getTime() + offset * 24 * 60 * 60 * 1000)
        const dateTime = date.toLocaleDateString().split('/').join('-')+' 18:00:00';
        const momentDate = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
        onChange?.(momentDate)
    }
    return (
        <div className='time-tags'>
            {
                config.map( item => {
                return <Tag key={item.offset} color={item.color} onClick={() => onClickDate(item.offset)}>{item.title}</Tag>
                })
            }
            <DatePicker locale={locale} showTime value={value} onChange={onChange} placeholder='选择任务截止日期' size="small"/>
        </div>
    )
}

export default QuickDatePicker;
