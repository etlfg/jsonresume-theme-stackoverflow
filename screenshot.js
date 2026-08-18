const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function capture() {
  try {
    const htmlFile = path.resolve(process.cwd(), 'preview.html');
    const screenshotFile = path.resolve(process.cwd(), 'preview.png');
    const pdfFile = path.resolve(process.cwd(), 'preview.pdf');

    if (!fs.existsSync(htmlFile)) {
      console.error('Error: preview.html not found. Run node preview.js first.');
      process.exit(1);
    }

    console.log('Launching browser for visual verification...');
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 1600 }
    });
    const page = await context.newPage();

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
    await page.emulateMedia({ media: 'print' });
    await page.screenshot({ path: 'preview-pdf-view.png', fullPage: true });

    await browser.close();
    console.log(`✅ Visual assets generated: \n- ${screenshotFile}\n- ${pdfFile}\n- preview-pdf-view.png`);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

capture();
