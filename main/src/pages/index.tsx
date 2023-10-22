import { useState } from 'react';
import './index.less';
import MainMenu from './components/MainMenu';
import TaskList from './components/TaskList';
import { MENU_KEY } from '@/const/index'

export default function IndexPage() {
  const [activeMenuKey, setActiveMenuKey] = useState(MENU_KEY.DOING);
  const [countChange, setCountChange] = useState(0);
  return (
    <div className="page container">
      <MainMenu activeMenuKey={activeMenuKey} onMenuKeyChange={(activeMenuKey) => setActiveMenuKey(activeMenuKey)} countChange={countChange}></MainMenu>
      <TaskList activeMenuKey={activeMenuKey} onCountChange={() => setCountChange(countChange+1)}></TaskList>
    </div>
  );
}
