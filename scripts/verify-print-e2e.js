const { chromium } = require('playwright');
const http = require('http');
const { render } = require('./dist/index.js');
const resume = require('@jsonresume/schema/sample.resume.json');

async function run() {
  // 1. Start a temporary server to serve the resume
  
  const server = http.createServer((req, res) => {
    const html = render(resume, { language: 'en-gb' });
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });

  server.listen(3456, '127.0.0.1', async () => {
    console.log('Verification server running at http://127.0.0.1:3456');
    
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    try {
      await page.goto('http://127.0.0.1:3456');
      
      // Emulate print media
      await page.emulateMedia('print');
      
      // Check 1: Background colors for Summary
      const summaryStyle = await page.evaluate(() => {
        const el = document.querySelector('.main-summary');
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          printColorAdjust: style.webkitPrintColorAdjust || style.printColorAdjust
        };
      });
      
      console.log('Summary Styles:', summaryStyle);
      
      // Check 2: Break-inside avoid for Timeline items
      const timelineItemStyle = await page.evaluate(() => {
        const el = document.querySelector('.timeline-item');
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          breakInside: style.breakInside
        };
      });
      
      console.log('Timeline Item Style:', timelineItemStyle);

      // Capture a screenshot for visual proof
      await page.screenshot({ path: 'e2e-print-verification.png', fullPage: true });
      console.log('Screenshot saved: e2e-print-verification.png');

      // Validate
      const isBgOk = summaryStyle && summaryStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const isBreakOk = timelineItemStyle && (timelineItemStyle.breakInside === 'avoid');

      if (isBgOk && isBreakOk) {
        console.log('✅ E2E VERIFICATION PASSED');
      } else {
        console.error('❌ E2E VERIFICATION FAILED');
        if (!isBgOk) console.error('- Background colors are stripped');
        if (!isBreakOk) console.error('- break-inside: avoid is missing');
        process.exit(1);
      }

    } catch (err) {
      console.error('Error during verification:', err);
      process.exit(1);
    } finally {
      await browser.close();
      server.close();
    }
  });
}

run();
