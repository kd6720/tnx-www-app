import puppeteer from 'puppeteer';
const OUT = '/home/claude/work/design-review';
const BASE = 'http://localhost:45901';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 45000 }).catch(()=>{});
await new Promise(r=>setTimeout(r,1500));
await page.screenshot({ path: `${OUT}/home-mobile-viewport-hero.png` });
await page.evaluate(()=>window.scrollTo(0, 1200));
await new Promise(r=>setTimeout(r,800));
await page.screenshot({ path: `${OUT}/home-mobile-viewport-scrolled-sticky.png` });

await page.goto(BASE + '/pots-replacement', { waitUntil: 'networkidle0', timeout: 45000 }).catch(()=>{});
await new Promise(r=>setTimeout(r,1500));
await page.screenshot({ path: `${OUT}/pots-mobile-viewport-hero.png` });

// desktop hero viewport shots for pots + voice (navbar overlap check)
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900 });
await d.goto(BASE + '/pots-replacement', { waitUntil: 'networkidle0', timeout: 45000 }).catch(()=>{});
await new Promise(r=>setTimeout(r,1500));
await d.screenshot({ path: `${OUT}/pots-desktop-viewport-hero.png` });
await d.goto(BASE + '/voice-solutions', { waitUntil: 'networkidle0', timeout: 45000 }).catch(()=>{});
await new Promise(r=>setTimeout(r,1500));
await d.screenshot({ path: `${OUT}/voice-desktop-viewport-hero.png` });
await d.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 45000 }).catch(()=>{});
await new Promise(r=>setTimeout(r,2500));
await d.screenshot({ path: `${OUT}/home-desktop-viewport-hero.png` });
await browser.close();
