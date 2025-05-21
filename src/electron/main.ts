import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDevEnv } from './utils/isDevEnv.js';

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

  if (isDevEnv()) {
    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'))
  }
})
