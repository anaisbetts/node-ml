import { ipcRenderer } from 'electron';

const origConsole = window.console;
window.console = Object.keys(console).reduce((acc, x) => {
  acc[x] = (...args: any[]) => {
    ipcRenderer.send(`console-${x}`, args);
    origConsole[x](...args);
  };

  return acc;
}, {});

export const itWorked = true;