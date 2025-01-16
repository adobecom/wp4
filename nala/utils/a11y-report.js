const path = require('path');
const fs = require('fs').promises;

// Pretty print HTML with proper indentation
function prettyPrintHTML(html) {
  const tab = '  '; // Define the indentation level
  let result = '';
  let indentLevel = 0;

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      // Closing tag
      indentLevel -= 1;
    }
    result += `${tab.repeat(indentLevel)}<${element}>\n`;
    if (element.match(/^<?\w[^>]*[^/]$/)) {
      // Opening tag
      indentLevel += 1;
    }
  });
  return result.trim();
}

function escapeHTML(html) {
  return html.replace(/[&<>'"]/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case "'": return '&#39;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}

async function generateA11yReport(report, outputDir) {
  const time = new Date();
  const reportName = `nala-a11y-report-${time
    .toISOString()
    .replace(/[:.]/g, '-')}.html`;

  const reportPath = path.resolve(outputDir, reportName);

  // Ensure the output directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory ${outputDir}: ${err.message}`);
    return;
  }

  try {
    const files = await fs.readdir(outputDir);
    for (const file of files) {
      if (file.startsWith('nala-a11y-report') && file.endsWith('.html')) {
        await fs.unlink(path.resolve(outputDir, file));
      }
    }
  } catch (err) {
    console.error(`Failed to delete the old report files in ${outputDir}: ${err.message}`);
  }

  // Check if the report contains violations
  if (!report || report.length === 0) {
    console.error('No accessibility violations to report.');
    return;
  }

  const totalViolations = report.reduce(
    (sum, result) => sum + (result.violations ? result.violations.length : 0),
    0,
  );

  const severityCount = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };

  report.forEach((result) => {
    result.violations?.forEach((violation) => {
      if (violation.impact) {
        severityCount[violation.impact] += 1;
      }
    });
  });

  // Inline CSS for the report with wrapping for pre blocks
  const inlineCSS = `
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; background-color: #f9f9f9; color: #333; }
      .banner { background: linear-gradient(135deg, #a45db3, #f0d4e2); padding: 30px; text-align: center; color: white; border-radius: 10px; margin-bottom: 30px; }
      .banner h1 { font-size: 2.5em; margin: 0; }
      .metadata-container { background-color: #e6f2ff; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
      .metadata-container p { margin: 0; font-size: 1.1em; }
      .filters { text-align: center; margin-bottom: 20px; }
      .filters button { padding: 10px 20px; margin: 5px; border: none; background-color: #003366; color: #fff; border-radius: 5px; cursor: pointer; }
      .filters button:hover { background-color: #00509e; }
      .violation-section { background-color: #f0f0f0; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
      th { background-color: #003366; color: white; }
      tr:nth-child(even) { background-color: #f2f2f2; }
      .severity-critical { color: red; font-weight: bold; }
      .severity-serious { color: orange; font-weight: bold; }
      .severity-moderate { color: #e6c600; font-weight: bold; }
      .severity-minor { color: green; font-weight: bold; }
      .collapsible { background-color: #f1f1f1; border: none; text-align: left; outline: none; font-size: 14px; cursor: pointer; }
      .collapsible::after { content: ' ▼'; }
      .collapsible.active::after { content: ' ▲'; }
      .content { display: none; padding: 10px; background-color: #f9f9f9; }
      td.fixed-column { max-width: 150px; white-space: pre-wrap; word-wrap: break-word; }
      td.centered { text-align: center; }
      .content pre { margin: 2px 0; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word; 
      }
    </style>`;

  // Inline JavaScript for collapsible functionality and filtering
  const inlineJS = `
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach(collapsible => {
          collapsible.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
          });
        });

        // Filtering function
        function filterBySeverity(severity) {
          const rows = document.querySelectorAll('.violation-row');
          rows.forEach(row => {
            const severityCell = row.querySelector('.severity-column');
            if (severityCell) {
              row.style.display = severity && severityCell.textContent.toLowerCase() !== severity.toLowerCase() ? 'none' : '';
            }
          });
        }

        document.querySelectorAll('.filter-button').forEach(button => {
          button.addEventListener('click', () => {
            const severity = button.getAttribute('data-severity');
            filterBySeverity(severity);
          });
        });
      });
    </script>`;

  let htmlContent = `
  <html>
  <head>
    <title>Nala Accessibility Test Report</title>
    ${inlineCSS}
  </head>
  <body>
    <div class="banner">
      <h1>Nala Accessibility Test Report</h1>
        <p style="font-size: 0.8em; line-height: 1.5;">
          <i class="icon">ℹ️</i><strong>Nala leverages the @axe-core/playwright</strong> library for accessibility testing, enabling developers to quickly identify and resolve issues.
          <br>
            Axe-core evaluates compliance with <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.0, 2.1, and 2.2</a> standards across levels A, AA, and AAA.
          <br>
            This ensures web pages meet accessibility requirements across regions like the United States and European Union, 
          <br>
            fostering inclusivity for individuals with disabilities.
        </p>
    </div>    
    <div class="metadata-container">
      <p>Total Violations: ${totalViolations}</p>
    </div>
    <div class="filters">
      <button class="filter-button" data-severity="">All</button>
      <button class="filter-button" data-severity="critical">Critical (${severityCount.critical})</button>
      <button class="filter-button" data-severity="serious">Serious (${severityCount.serious})</button>
      <button class="filter-button" data-severity="moderate">Moderate (${severityCount.moderate})</button>
      <button class="filter-button" data-severity="minor">Minor (${severityCount.minor})</button>
    </div>`;

  // Test details section
  report.forEach((result, resultIndex) => {
    htmlContent += `
    <div class="violation-section">
      <h2>#${resultIndex + 1} Test URL: <a href="${result.url}" target="_blank">${result.url}</a></h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Violation</th>
            <th>Axe Rule ID</th>
            <th>Severity</th>
            <th>WCAG Tags</th>
            <th>Nodes Affected</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>`;

    result.violations.forEach((violation, index) => {
      const severityClass = `severity-${violation.impact.toLowerCase()}`;
      const wcagTags = Array.isArray(violation.tags) ? violation.tags.join(', ') : 'N/A';
      const nodesAffected = violation.nodes
        .map((node) => `<p><pre><code>${prettyPrintHTML(escapeHTML(node.html))}</pre></code></p>`)
        .join('\n');
      const possibleFix = violation.helpUrl ? `<a href="${violation.helpUrl}" target="_blank">Fix</a>` : 'N/A';

      htmlContent += `
        <tr class="violation-row">
          <td>${index + 1}</td>
          <td class="fixed-column">${violation.description}</td>
          <td>${violation.id}</td>
          <td class="severity-column ${severityClass}">${violation.impact}</td>
          <td class="fixed-column">${wcagTags}</td>
          <td class="fixed-column">
            <button class="collapsible">Show Nodes</button>
              <!--<div class="content"><pre><code>${nodesAffected}</code></pre></div> -->
              <div class="content">${nodesAffected}
              </div>
          </td>
          <td class="centered">${possibleFix}</td>
        </tr>`;
    });

    htmlContent += `
        </tbody>
      </table>
    </div>`;
  });

  htmlContent += `
    ${inlineJS}
  </body>
  </html>`;

  // Write the HTML report to file
  try {
    await fs.writeFile(reportPath, htmlContent);
    console.info(`Accessibility report saved at: ${reportPath}`);
    // eslint-disable-next-line consistent-return
    return reportPath;
  } catch (err) {
    console.error(`Failed to save accessibility report: ${err.message}`);
  }
}

module.exports = generateA11yReport;
