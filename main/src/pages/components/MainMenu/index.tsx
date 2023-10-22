import React, { FC, useEffect, useState } from 'react'
import './index.less';
import MenuItem from './components/MenuItem'
import config from './components/MenuItem/config';
import { api } from '@/api/index'
import apiConfig from '@/api/config'
import { API_RESULT } from '@/const/index'

interface MainMenuProps {
  activeMenuKey: number;
  onMenuKeyChange: (menu: number) => void;
  countChange: number;
}

const MainMenu: FC<MainMenuProps> = ({activeMenuKey, onMenuKeyChange, countChange}) => {
  const [countResult, setCountResult] = useState<Record<string, number>>({doing: 0, done:0})

  const getCount = () => {
    api(apiConfig.count.url).then(res => {
      if(res.code == API_RESULT.SUCCESS) {
        setCountResult(res.data)
      }
    })
  }

  useEffect(() => {
    getCount()
  },[countChange])

  return (
    <div className='main-menu'>
      <h1 className='main-title'>主菜单</h1>
      {
        config.map(item => (
          <MenuItem 
            name={item.name}
            active={activeMenuKey == item.key}
            key={item.key} 
            count={countResult[item.countKey]}
            onClick={() => onMenuKeyChange(item.key)} 
            icon={item.icon}
          />
        ))
      }
    </div>
  )
}

export default MainMenu; 