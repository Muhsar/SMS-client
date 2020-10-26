const {app, BrowserWindow, Tray} = require('electron');
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const test = 'test'
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  const icon = isDev ? path.join(__dirname,'./icons/icon.png') : path.join(__dirname,'../build/icons/icon.png')
  new Tray(icon)
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
