#!/usr/bin/env node

const proc = require('child_process');
const path = require('path');

const reservedNames = [
  '--version',
  '--inspect'
];

// NB: We strip --version et al because otherwise electron itself will eat it
const sanitizedParams = process.argv.slice(2).map(x => {
  if (reservedNames.indexOf(x) < 0) return x;
  return `${x}-nodeml`;
});

const params = [require.resolve('./index.ts')].concat(sanitizedParams)

const cli = path.resolve(require.resolve('electron-prebuilt-compile'), '..', 'cli.js');
const child = proc.spawn(cli, params, { stdio: 'inherit' });

child.on('close', (code) => process.exit(code));