// ✅ main.js (CommonJS version)
const { app, BrowserWindow, ipcMain } = require('electron');
const say = require('say');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('renderer/index.html');
 // mainWindow.webContents.openDevTools(); <- Uncomment to open DevTools
}

app.whenReady().then(createWindow);

ipcMain.handle('speak', async (_, text) => {
  console.log('Main process received speak request with text:', text);

  return new Promise((resolve, reject) => {
    say.speak(text, undefined, 1.0, (err) => {
      if (err) {
        console.error('say.speak error:', err);
        reject(err);
      } else {
        console.log('say.speak completed successfully');
        resolve('Speech finished');
      }
    });
  });
});
