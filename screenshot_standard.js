const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function capture() {
  try {
    const htmlFile = path.resolve(process.cwd(), 'preview_standard.html');
    const screenshotFile = path.resolve(process.cwd(), 'preview_standard.png');
    const pdfFile = path.resolve(process.cwd(), 'preview_standard.pdf');

    if (!fs.existsSync(htmlFile)) {
      console.error('Error: preview_standard.html not found. Run node preview.js first.');
      process.exit(1);
    }

    console.log('Launching browser for visual verification...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set a realistic viewport
    await page.setViewportSize({ width: 1200, height: 1600 });

    await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle' });
    
    // Give a moment for any potential Svelte hydration or fonts to settle
    await page.waitForTimeout(500);

    console.log('Capturing HTML screenshot...');
    await page.screenshot({ path: screenshotFile, fullPage: true });

    console.log('Generating PDF for OCR check...');
    await page.pdf({
      path: pdfFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    // We create a PNG of the first page of the PDF for easier OCR/Visual check
    // Playwright can't directly "screenshot a PDF", so we use the page.pdf logic 
    // but we can also just take a screenshot with the 'screen' media emulation
    await page.emulateMedia({ media: 'screen' });
    await page.screenshot({ path: 'preview_standard.pdf-view.png', fullPage: true });

    await browser.close();
    console.log(`✅ Visual assets generated: \n- ${screenshotFile}\n- ${pdfFile}\n- preview_standard.pdf-view.png`);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

capture();
