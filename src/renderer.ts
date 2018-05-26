import './console-redirect-renderer';
import { remote } from 'electron';

export async function run(file: string) {
  try {
    const mod = require(file);

    if (mod && 'run' in mod) {
      await mod.run();
    }
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
  }
}