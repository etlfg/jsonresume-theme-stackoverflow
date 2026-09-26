const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Usage: node scripts/screenshot.js [datafile]  (default: resume)
// Output: artifacts/<datafile>.png, artifacts/<datafile>.pdf, artifacts/<datafile>-page-1.png
async function capture() {
  try {
    const datafile = process.argv[2] || 'resume';
    const outputDir = path.resolve(process.cwd(), 'artifacts');
    const htmlFile = path.join(outputDir, `${datafile}.html`);
    const screenshotFile = path.join(outputDir, `${datafile}.png`);
    const pdfFile = path.join(outputDir, `${datafile}.pdf`);
    const printViewFile = path.join(outputDir, `${datafile}-page-1.png`);

    if (!fs.existsSync(htmlFile)) {
      console.error(`Error: ${htmlFile} not found. Run node scripts/preview.js ${datafile} first.`);
      process.exit(1);
    }
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    console.log('Launching browser for visual verification...');
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 1600 }
    });
    const page = await context.newPage();

    await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle' });
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

    await page.emulateMedia({ media: 'print' });
    await page.screenshot({ path: printViewFile, fullPage: true });

    await browser.close();
    console.log(`Visual assets generated:\n- ${screenshotFile}\n- ${pdfFile}\n- ${printViewFile}`);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

capture();