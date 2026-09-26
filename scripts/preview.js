const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Usage: node scripts/preview.js [datafile]  (default: resume)
// Output: artifacts/<datafile>.html
const theme = require('../dist/index.js');

async function render() {
  try {
    const datafile = process.argv[2] || 'resume';
    const resumePath = path.resolve(process.cwd(), `${datafile}.yaml`);
    const outputDir = path.resolve(process.cwd(), 'artifacts');
    const outputPath = path.join(outputDir, `${datafile}.html`);

    if (!fs.existsSync(resumePath)) {
      console.error(`Error: ${datafile}.yaml not found in current directory.`);
      process.exit(1);
    }
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    console.log(`Reading resume from ${resumePath}...`);
    const fileContents = fs.readFileSync(resumePath, 'utf8');
    const resume = yaml.load(fileContents);

    console.log('Rendering HTML...');
    const html = theme.render(resume);

    fs.writeFileSync(outputPath, html);
    console.log(`Successfully generated preview: ${outputPath}`);
  } catch (error) {
    console.error('Rendering failed:', error);
    process.exit(1);
  }
}

render();