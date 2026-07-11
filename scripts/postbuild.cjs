#!/usr/bin/env node
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');

const localSnapChromium = '/snap/bin/chromium';
const envChromium = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_BIN;
const chromiumPath = envChromium || (existsSync(localSnapChromium) ? localSnapChromium : null);
const explicitlyEnabled = process.env.ENABLE_REACT_SNAP === '1';

if (!explicitlyEnabled) {
  console.log('[postbuild] Skipping react-snap by default. Set ENABLE_REACT_SNAP=1 to enable pre-rendering.');
  process.exit(0);
}

if (!chromiumPath) {
  console.log('[postbuild] react-snap requested, but no Chromium executable is available.');
  console.log('[postbuild] Set PUPPETEER_EXECUTABLE_PATH or CHROME_BIN before enabling pre-rendering.');
  process.exit(1);
}

console.log(`[postbuild] Running react-snap with Chromium at: ${chromiumPath}`);
const result = spawnSync(
  'npx',
  ['react-snap'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      PUPPETEER_EXECUTABLE_PATH: chromiumPath,
      CHROME_BIN: chromiumPath,
    },
  }
);

if (typeof result.status === 'number') {
  process.exit(result.status);
}

console.error('[postbuild] react-snap did not return an exit code.');
process.exit(1);
