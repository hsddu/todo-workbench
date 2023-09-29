import React, { useState } from 'react'
import './index.less';
import MenuItem from './components/MenuItem'
import config from './components/MenuItem/config';

export default function MainMenu() {
  const [activeKey, setActiveKey] = useState('doing');
  return (
    <div className='main-menu'>
      <h1 className='main-title'>主菜单</h1>
      {
        config.map(item => (
          <MenuItem 
            name={item.name}
            active={activeKey == item.key}
            key={item.key} 
            count={item.count} 
            onClick={() => setActiveKey(item.key)} 
          />
        ))
      }
    </div>
  )
}
