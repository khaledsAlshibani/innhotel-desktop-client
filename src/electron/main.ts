import { app, BrowserWindow } from 'electron'
import path from 'path'

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    center: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'))
  // mainWindow.webContents.openDevTools();
})
