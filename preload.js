const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tts', {
  speak: (text) => ipcRenderer.invoke('speak', text)
});
