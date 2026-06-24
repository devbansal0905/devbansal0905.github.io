import puppeteer from 'puppeteer';
import http from 'http';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 }); // iPhone SE
  
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.orb-container');
  
  const rect = await page.evaluate(() => {
    const el = document.querySelector('.orb-system');
    const container = document.querySelector('.orb-container');
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return { container: cRect, orb: eRect };
  });
  
  console.log(JSON.stringify(rect, null, 2));
  await browser.close();
})();
