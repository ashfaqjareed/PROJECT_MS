const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const HTML_FILES = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

const SYMBOLS_TO_REMOVE = /[✦✧★☆•·✨]/g;
const MOJIBAKE_REPLACEMENTS = {
    'ðŸ§®': '',
    'ðŸ"¦': '',
    'ðŸ"¬': '',
    'â†’': '→',
    'â†"': '←',
    'â€"': '—',
    'âœ"': '✓',
    'â—': '•',
    'ðŸ”¥': '🔥',
    'ðŸ“Š': '📊',
    'ðŸ“¬': '📩',
    'â\x9c\x93': '✓'
};

HTML_FILES.forEach(file => {
    let html = fs.readFileSync(path.join(DIR, file), 'utf8');
    let original = html;

    // 1. Remove decorative symbols
    html = html.replace(SYMBOLS_TO_REMOVE, '');

    // 2. Fix Mojibake
    for (const [key, val] of Object.entries(MOJIBAKE_REPLACEMENTS)) {
        html = html.split(key).join(val);
    }

    // 3. Enlarge logo (from 80 to 110)
    html = html.replace(/height: 80px;/g, 'height: 110px;');
    html = html.replace(/height="80"/g, 'height="110"');
    // For logos with style="height: 60px" (login page)
    if (file === 'login.html') {
        html = html.replace(/height: 60px;/g, 'height: 90px;');
    }

    // 4. Favicon Consistency
    if (!html.includes('link rel="icon"')) {
        if (html.includes('</head>')) {
            html = html.replace('</head>', '    <link rel="icon" type="image/png" href="img/favicon.png">\n</head>');
        }
    } else {
        // Ensure it points to img/favicon.png
        html = html.replace(/href="[^"]*favicon[^"]*"/g, 'href="img/favicon.png"');
    }

    // 5. Special Fix for "Hot Offers" emoji if it survived as Mojibake
    html = html.replace(/<h2 class="section-title">ðŸ”¥/g, '<h2 class="section-title">🔥');

    if (html !== original) {
        fs.writeFileSync(path.join(DIR, file), html, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Global cleanup complete!');
