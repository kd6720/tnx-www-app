#!/usr/bin/env node
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');

function runSeoPatch() {
  const patchResult = spawnSync(process.execPath, [require.resolve('./patch-prerendered-seo.cjs')], {
    stdio: 'inherit',
    env: process.env,
  });
  if (typeof patchResult.status === 'number') {
    process.exit(patchResult.status);
  }
  console.error('[postbuild] SEO patch script did not return an exit code.');
  process.exit(1);
}

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
    console.log('[postbuild] Skipping react-snap. Creating static blog route shells and patching SEO metadata.');
    runSeoPatch();
    return;
  }

  const chromiumPath = await resolveChromiumPath();
  if (!chromiumPath) {
    console.log('[postbuild] No Chromium executable available; skipping react-snap and patching SEO metadata directly.');
    runSeoPatch();
    return;
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
    if (result.status !== 0) {
      process.exit(result.status);
    }
    runSeoPatch();
    return;
  }

  console.error('[postbuild] react-snap did not return an exit code.');
  process.exit(1);
}

main().catch((error) => {
  console.error('[postbuild] Fatal error:', error?.stack || error);
  process.exit(1);
});
