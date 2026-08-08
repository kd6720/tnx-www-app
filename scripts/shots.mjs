import puppeteer from 'puppeteer';

const OUT = '/home/claude/work/design-review';
const BASE = 'http://localhost:45901';
const pages = [
  ['/', 'home'],
  ['/pots-replacement', 'pots-replacement'],
  ['/ai-workforce', 'ai-workforce'],
  ['/voice-solutions', 'voice-solutions'],
  ['/internet-connectivity', 'internet-connectivity'],
  ['/contact', 'contact'],
  ['/blog', 'blog'],
];

const browser = await puppeteer.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});

async function shoot(viewport, suffix) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  for (const [path, name] of pages) {
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 45000 });
    } catch (e) {
      console.log('goto timeout (continuing):', path, e.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
    // scroll to bottom to trigger lazy content, then back
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const t = setInterval(() => {
          y += 800;
          window.scrollTo(0, y);
          if (y >= document.body.scrollHeight) { clearInterval(t); resolve(); }
        }, 100);
      });
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: `${OUT}/${name}-${suffix}.png`, fullPage: true });
    console.log('saved', `${name}-${suffix}.png`);
  }
  await page.close();
}

await shoot({ width: 1440, height: 900 }, 'desktop');
await shoot({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, 'mobile');

await browser.close();
