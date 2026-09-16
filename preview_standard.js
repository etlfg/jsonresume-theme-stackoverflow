const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Using commonjs for compatibility with existing dist/index.js
const theme = require('./dist/index.js');

async function render() {
  try {
    const resumePath = path.resolve(process.cwd(), 'standard_devops_fr.yaml');
    const outputPath = path.resolve(process.cwd(), 'preview_standard.html');

    if (!fs.existsSync(resumePath)) {
      console.error('Error: standard_devops_fr.yaml not found in current directory.');
      process.exit(1);
    }

    console.log(`Reading resume from ${resumePath}...`);
    const fileContents = fs.readFileSync(resumePath, 'utf8');
    const resume = yaml.load(fileContents);

    console.log('Rendering HTML...');
    const html = theme.render(resume);

    fs.writeFileSync(outputPath, html);
    console.log(`✅ Successfully generated preview: ${outputPath}`);
  } catch (error) {
    console.error('Rendering failed:', error);
    process.exit(1);
  }
}

render();