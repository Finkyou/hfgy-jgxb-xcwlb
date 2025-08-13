const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 需要截图的页面路径
const pages = [
  'index.html',
  'pages/duty.html',
  'pages/members.html',
  'pages/news.html',
  'pages/photography.html',
  'pages/privacy.html',
  'pages/recruitment.html',
  'pages/resources.html',
  'pages/submit.html'
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();

  for (const p of pages) {
    const filePath = 'file://' + path.resolve(__dirname, p);
    await page.goto(filePath, {waitUntil: 'networkidle2'});
    await page.setViewport({width: 1440, height: 900});
    const screenshotPath = path.join(__dirname, 'screenshots', p.replace(/\//g, '_') + '.png');
    fs.mkdirSync(path.dirname(screenshotPath), {recursive: true});
    await page.screenshot({path: screenshotPath, fullPage: true});
    console.log('已截图：', screenshotPath);
  }

  await browser.close();
})();
