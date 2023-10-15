import React, { FC, useState } from 'react'
import './index.less';
import MenuItem from './components/MenuItem'
import config from './components/MenuItem/config';

interface MainMenuProps {
  activeMenuKey: number;
  onMenuKeyChange: (menu: number) => void
}

const MainMenu: FC<MainMenuProps> = ({activeMenuKey, onMenuKeyChange}) => {
  return (
    <div className='main-menu'>
      <h1 className='main-title'>主菜单</h1>
      {
        config.map(item => (
          <MenuItem 
            name={item.name}
            active={activeMenuKey == item.key}
            key={item.key} 
            count={item.count} 
            onClick={() => onMenuKeyChange(item.key)} 
            icon={item.icon}
          />
        ))
      }
    </div>
  )
}

export default MainMenu; 