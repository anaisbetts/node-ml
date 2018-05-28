import { remote } from 'electron';

import './console-redirect-renderer';

export async function run(file: string, shouldDebug: boolean) {
  if (shouldDebug) {
    const wnd = remote.getCurrentWindow();

    wnd.setSize(1024, 768);
    wnd.show();
    wnd.webContents.openDevTools();
  }

  try {
    const mod = require(file);

    if (mod && 'run' in mod) {
      await mod.run();
    }

    if (shouldDebug) { console.log('(Module exited successfully)'); }
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    debugger;
  }
}