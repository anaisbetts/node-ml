const fs = require('fs');
const path = require('path');

const { app } = require('electron');
const { init } = require('electron-compile');

function findPackageJson(initScript) {
  if (initScript === '/' || initScript.match(/^[A-Za-z]:$/)) {
    throw new Error("Can't find package.json");
  }

  // Walk up the parent directories until we find package.json. Make sure that
  // we're not actually stumbling upon a parent npm package
  let ret = path.join(initScript, 'package.json')
  if (fs.statSyncNoException(ret) && !path.resolve(path.dirname(ret), '..').match(/[\\\/]node_modules$/i)) {
    return ret;
  }

  return findPackageJson(path.dirname(initScript));
}

/**
 * Some debugger environment reconstruct process argument and inject args ignoring original order,
 * extract to find out right path for init script.
 *
 */
function getInitScriptPath() {
  const rawArgv = process.argv.filter((x) => x.indexOf(`--inspect=`) === -1 && x.indexOf(`--debug-brk`))[2];
  return path.resolve(rawArgv);
}

function main() {
  const initScript = require.resolve('./index.ts')
  const packageJson = findPackageJson(initScript);
  const appPath = path.dirname(packageJson);

  app.setName('node-gpu');
  init(path.dirname(packageJson), initScript);
}

main()