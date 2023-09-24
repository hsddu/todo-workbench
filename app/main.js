// 主进程：负责控制应用的生命周期，显示原生界面，执行特殊操作并管理渲染器
const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})