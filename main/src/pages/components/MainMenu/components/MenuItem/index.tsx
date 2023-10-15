import React, { ReactNode } from 'react'
import './index.less';

interface IProps {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon?: () => ReactNode;
}

export default function MenuItem(props: IProps) {
  const { name, count, active, icon, onClick } = props;
  return (
    <button className={`menu-item ${active ? 'menu-item-active' : ''}`} onClick={() => onClick()}>
      {icon?.()}
      <span className='menu-item-name'>{name}</span>
      <span className='menu-item-count'>{count}</span>
    </button>
  )
}
