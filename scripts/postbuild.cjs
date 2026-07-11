#!/usr/bin/env node
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');

async function resolveChromiumPath() {
  const envChromium = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_BIN;
  if (envChromium && existsSync(envChromium)) return envChromium;

  try {
    const puppeteer = require('puppeteer');
    const path = await puppeteer.executablePath();
    if (path && existsSync(path)) return path;
  } catch (error) {
    console.warn('[postbuild] Puppeteer-managed browser not available:', error?.message || error);
  }

  const localSnapChromium = '/snap/bin/chromium';
  if (existsSync(localSnapChromium)) return localSnapChromium;

  return null;
}

async function main() {
  const shouldRun = process.env.NETLIFY === 'true' || process.env.ENABLE_REACT_SNAP === '1';

  if (!shouldRun) {
    console.log('[postbuild] Skipping react-snap by default. Set ENABLE_REACT_SNAP=1 to enable local pre-rendering.');
    process.exit(0);
  }

  const chromiumPath = await resolveChromiumPath();
  if (!chromiumPath) {
    console.log('[postbuild] react-snap requested, but no Chromium executable is available.');
    process.exit(1);
  }

  console.log(`[postbuild] Running react-snap with Chromium at: ${chromiumPath}`);
  const result = spawnSync('npx', ['react-snap'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PUPPETEER_EXECUTABLE_PATH: chromiumPath,
      CHROME_BIN: chromiumPath,
    },
  });

  if (typeof result.status === 'number') {
    process.exit(result.status);
  }

  console.error('[postbuild] react-snap did not return an exit code.');
  process.exit(1);
}

main().catch((error) => {
  console.error('[postbuild] Fatal error:', error?.stack || error);
  process.exit(1);
});
