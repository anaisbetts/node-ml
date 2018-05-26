import { ipcRenderer } from 'electron';

window.console = Object.keys(console).reduce((acc, x) => {
  acc[x] = (...args: any[]) => ipcRenderer.send(`console-${x}`, args);
  return acc;
}, {});

export const itWorked = true;