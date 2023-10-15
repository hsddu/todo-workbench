import { useState } from 'react';
import './index.less';
import MainMenu from './components/MainMenu';
import TaskList from './components/TaskList';
import { MENU_KEY } from '@/const/index'

export default function IndexPage() {
  const [activeMenuKey, setActiveMenuKey] = useState(MENU_KEY.DOING);
  return (
    <div className="page container">
      <MainMenu activeMenuKey={activeMenuKey} onMenuKeyChange={(activeMenuKey) => setActiveMenuKey(activeMenuKey)}></MainMenu>
      <TaskList activeMenuKey={activeMenuKey}></TaskList>
    </div>
  );
}
