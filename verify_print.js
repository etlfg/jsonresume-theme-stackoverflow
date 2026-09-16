const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = 'http://localhost:3456';
  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    console.log('Taking regular screenshot...');
    await page.screenshot({ path: 'regular_view.png', fullPage: true });

    console.log('Emulating print media...');
    await page.emulateMedia({ media: 'print' });
    await page.screenshot({ path: 'print_preview.png', fullPage: true });

    console.log('Generating PDF...');
    await page.pdf({ 
      path: 'resume_print.pdf', 
      format: 'A4', 
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } 
    });

    console.log('Verification files generated: regular_view.png, print_preview.png, resume_print.pdf');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
})();
