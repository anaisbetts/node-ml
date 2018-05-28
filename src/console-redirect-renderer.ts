import { ipcRenderer } from 'electron';

const origConsole = window.console;

// NB: Trick Typescript via the power of string concatenation
window['con' + 'sole'] = Object.keys(console).reduce((acc, x) => {
  acc[x] = (...args: any[]) => {
    ipcRenderer.send(`console-${x}`, args);
    origConsole[x](...args);
  };

  return acc;
}, {});

export const itWorked = true;