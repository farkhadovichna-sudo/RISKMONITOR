const fs = require('fs');
const path = require('path');

// Read CSS
const css = fs.readFileSync('css/styles.css', 'utf8');

// Read all JS files in order
const jsFiles = [
  'js/router.js',
  'js/components/ui.js',
  'js/components/charts.js',
  'js/data/mockData.js',
  'js/pages/landing.js',
  'js/pages/login.js',
  'js/pages/dashboard.js',
  'js/pages/tenders.js',
  'js/pages/tenderDetail.js',
  'js/pages/cases.js',
  'js/pages/caseDetail.js',
  'js/pages/reports.js',
  'js/pages/admin.js',
  'js/app.js'
];

let jsContent = jsFiles.map(f => {
  try {
    return fs.readFileSync(f, 'utf8');
  } catch(e) {
    console.log('Could not read:', f);
    return '';
  }
}).join('\n\n');

const html = `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RiskMonitor - Davlat Xaridlari Risk-Skoring Platformasi</title>
    <meta name="description" content="Davlat xaridlarida risk-skoring va analitik monitoring tizimi">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>">
    <style>
${css}
    </style>
</head>
<body>
    <div id="app">
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh;">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🛡️</div>
                <div style="font-size: 1.25rem; color: #64748b;">Yuklanmoqda...</div>
            </div>
        </div>
    </div>
    <script>
${jsContent}
    </script>
</body>
</html>`;

fs.writeFileSync('riskmonitor-standalone.html', html);
console.log('Bundle created: riskmonitor-standalone.html');
console.log('Size:', Math.round(html.length / 1024), 'KB');
