#!/usr/bin/env node

const proc = require('child_process');
const path = require('path');

const params = [require.resolve('./index.ts')].concat([process.argv.slice(2)]);
const cli = path.resolve(require.resolve('electron-prebuilt-compile'), '..', 'cli.js');
const child = proc.spawn(cli, params, { stdio: 'inherit' });

child.on('close', (code) => process.exit(code));