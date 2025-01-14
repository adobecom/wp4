// build-docs.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItContainer from 'markdown-it-container';
import markdownItHighlightjs from 'markdown-it-highlightjs';

// Reconstruct __dirname and __filename in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = process.argv[2];
if (!sourceFile) {
    console.error('Please provide a source file as an argument');
    process.exit(1);
}

const targetFile = process.argv[3];
if (!targetFile) {
    console.error('Please provide a target file as an argument');
    process.exit(1);
}

// Initialize markdown-it with desired plugins
const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
})
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: (slug, state) => ({
                href: `#${slug}`,
                title: 'Permalink to this heading',
            }),
        }),
    })
    .use(markdownItContainer, 'warning')
    .use(markdownItHighlightjs);

// Define input and output paths
const inputPath = path.join(__dirname, sourceFile);
const outputPath = path.join(targetFile);

// Read the Markdown file
const inputContent = fs.readFileSync(inputPath, 'utf8');

// Render Markdown to HTML
const htmlContent = md.render(inputContent);

// HTML template with your custom element script
const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>M@S Web Components</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="spectrum.css">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://use.typekit.net/hah7vzn.css">
  
  <!-- Include your custom element script as an ES6 module -->
  <script type="module">
    import { init } from './common.js';
    init();
  </script>
  <!-- Include Highlight.js stylesheet for syntax highlighting -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
  <!-- Include any additional stylesheets -->
  <link rel="stylesheet" href="styles.css">
</head>
<body class="spectrum spectrum--medium spectrum--light">
<aside class="sidenav">
    <a href="/libs/features/mas/docs/mas.html">Home</a>
    <a href="/libs/features/mas/docs/mas.js.html">mas.js</a>
    <a href="/libs/features/mas/docs/checkout-link.html">Checkout Link</a>
    <a href="/libs/features/mas/docs/inline-price.html">Inline Price</a>
    <a href="/libs/features/mas/docs/merch-card.html">Merch Card</a>
    <a href="/libs/features/mas/docs/ccd.html">CCD Gallery</a>
    <a href="/libs/features/mas/docs/benchmarks.html">Benchmarks</a>
</aside>
<main>
<sp-theme color="light" scale="medium">
${htmlContent}
</sp-theme>
</main>
<script type="module">
  document.querySelectorAll('code.demo').forEach(el => {
      const targetContainer = document.createElement('div');
      targetContainer.classList.toggle('light', el.classList.contains('light'));
      targetContainer.innerHTML = \`<h4>Demo: </h4><div class="demo-container">\${el.textContent}</div>\`;
      el.parentElement.after(targetContainer);
      // Extract and evaluate <script> tags
      const scriptTags = targetContainer.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
          const script = document.createElement('script');
          script.text = scriptTags[i].text;
          document.body.appendChild(script); // Appends to the document to execute
          scriptTags[i].remove(); // Remove the script tag
      }
  });
</script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync(outputPath, htmlTemplate, 'utf8');
console.log('Documentation generated at', outputPath);
