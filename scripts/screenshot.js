const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Usage: node scripts/screenshot.js [datafile]  (default: resume)
// Requires: node scripts/preview.js [datafile] first
// Output (in artifacts/):
//   <datafile>.png        - full-page screenshot (screen view)
//   <datafile>.pdf        - print PDF
//   <datafile>-page-N.png - exact per-page renders of the PDF (via pdftoppm)
async function capture() {
  try {
    const datafile = process.argv[2] || 'resume';
    const outputDir = path.resolve(process.cwd(), 'artifacts');
    const htmlFile = path.join(outputDir, `${datafile}.html`);
    const screenshotFile = path.join(outputDir, `${datafile}.png`);
    const pdfFile = path.join(outputDir, `${datafile}.pdf`);

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

    console.log('Capturing full-page screenshot...');
    await page.screenshot({ path: screenshotFile, fullPage: true });

    console.log('Generating print PDF...');
    await page.pdf({
      path: pdfFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();

    // Exact per-page renders from the PDF (matches PDF pagination exactly)
    try {
      execSync(`pdftoppm -png -r 150 "${pdfFile}" "${path.join(outputDir, datafile + '-page')}"`);
      console.log(`Per-page renders: ${path.join(outputDir, datafile + '-page-N.png')}`);
    } catch (e) {
      console.warn('pdftoppm not available — skipping per-page renders.');
    }

    console.log(`Visual assets generated:\n- ${screenshotFile}\n- ${pdfFile}\n- ${path.join(outputDir, datafile + '-page-N.png')}`);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

capture();