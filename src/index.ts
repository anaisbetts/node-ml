import { app } from 'electron';
import { rendererRequireDirect } from 'electron-remote';

import './console-redirect-browser';

import * as path from 'path';
import * as yargs from 'yargs';

const args = yargs(process.argv.slice(2).map(x => x.replace('-nodeml', '')))
  .usage('Usage: node-ml [script]')
  .describe('inspect', 'Opens a Devtools window to debug your script')
  .boolean('inspect')
  .describe('version', 'Display version information and exit')
  .alias('h', 'help')
  .argv;

app.on('window-all-closed', () => app.quit());

app.on('ready', async () => {
  const dbg = args['inspect'];

  if (args['version']) {
    // tslint:disable-next-line:no-require-imports
    console.log(`node-ml ${require('../package.json').version}\n`);
    console.log(`Electron Version Info:\n${JSON.stringify(process.versions, null, 2)}`);
    app.quit();
    return;
  }

  if (!('_' in args) || args._.length !== 1 || args._[0].length < 1) {
    console.error('Interactive mode not yet supported, specify a script to run\n');
    app.quit();
    return;
  }

  const [ scriptToRun ] = args._;
  const { module } = await rendererRequireDirect(
    require.resolve('./renderer'),
    2 * 24 * 60 * 60 * 1000);

  await module.run(path.resolve(scriptToRun), dbg);

  if (!dbg) {
    app.quit();
  }
});