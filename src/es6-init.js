const fs = require('fs');
const path = require('path');

const { app } = require('electron');
const { createCompilerHostFromConfigFileSync, initializeGlobalHooks } = require('electron-compile');

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

function main() {
  const initScript = require.resolve('./index.ts')
  const packageJson = findPackageJson(initScript);
  const compilercPath = require.resolve('../.compilerc');

  app.setName('node-gpu');

  // NB: We do this because we want to force our built-in compilerc to be used,
  // which isn't ideal - in the future we should precompile our app and let the
  // developer choose.
  const compilerHost = createCompilerHostFromConfigFileSync(compilercPath);
  initializeGlobalHooks(compilerHost, false);
  require.main.require(initScript);
}

main()