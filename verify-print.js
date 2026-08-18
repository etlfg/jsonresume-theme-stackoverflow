const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3456');
    
    // Emulate print media
    await page.emulateMedia({ media: 'print' });
    
    // Get computed styles for summary
    const summaryStyle = await page.evaluate(() => {
      const el = document.querySelector('.summary') || document.body;
      const style = window.getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color
      };
    });
    console.log('Computed Styles for Summary:', summaryStyle);

    await page.screenshot({ path: 'print-verification.png', fullPage: true });
    console.log('Screenshot saved as print-verification.png');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
