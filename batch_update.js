/**
 * Batch HTML Update Script
 * Applies all 7 prompts' HTML changes across all pages
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const HTML_FILES = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

// New branch pills for header-main
const BRANCH_PILLS = `
                <div class="header-branch-pills">
                    <button class="branch-pill active" data-branch="akurana" onclick="window.setSelectedBranch('akurana')">Akurana</button>
                    <button class="branch-pill" data-branch="kandy" onclick="window.setSelectedBranch('kandy')">Kandy</button>
                    <button class="branch-pill" data-branch="matale" onclick="window.setSelectedBranch('matale')">Matale</button>
                    <button class="branch-pill" data-branch="wattala" onclick="window.setSelectedBranch('wattala')">Wattala</button>
                </div>`;

// Page loader HTML
const PAGE_LOADER = `    <!-- Page Loader -->
    <div class="page-loader" id="page-loader">
        <div class="loader-logo">
            <span class="loader-multi">Multi</span>
            <span class="loader-super">Super</span>
        </div>
        <div class="loader-bar-wrap">
            <div class="loader-bar" id="loader-bar"></div>
        </div>
    </div>
`;

// Loader script for <head>
const LOADER_SCRIPT = `    <script>
    (function() {
        window.addEventListener('load', function() {
            setTimeout(function() {
                var loader = document.getElementById('page-loader');
                if (loader) loader.classList.add('hidden');
            }, 300);
        });
        setTimeout(function() {
            var loader = document.getElementById('page-loader');
            if (loader) loader.classList.add('hidden');
        }, 2500);
    })();
    </script>
`;

// Updated Malee greeting
const OLD_MALEE = `Hi! I'm Malee. How can I help you today? You can ask me about our branches,
                offers, or loyalty points!`;
const OLD_MALEE2 = `Hi! I'm Malee. How can I help you today? You can ask me about our branches, offers, or loyalty points!`;
const NEW_MALEE = `Ayubowan machan! 👋 I'm Malee, your Multi Super helper. Ask me anything — I know this place better than the cashier aunty! 😄`;

// Footer with branch details
const NEW_FOOTER_BRANCHES = `                    <div class="footer-col footer-branches-col">
                        <h4 class="footer-heading">Our Branches</h4>
                        <div class="footer-branch-item">
                            <strong class="footer-branch-name">Akurana</strong>
                            <p>45 Main Street, Akurana, Kandy 20850</p>
                            <p>081 230 4455</p>
                            <p>Mon–Sun: 7:30 AM – 9:30 PM</p>
                        </div>
                        <div class="footer-branch-item">
                            <strong class="footer-branch-name">Kandy</strong>
                            <p>12 Peradeniya Road, Kandy 20000</p>
                            <p>081 222 5566</p>
                            <p>Mon–Sun: 8:00 AM – 10:00 PM</p>
                        </div>
                        <div class="footer-branch-item">
                            <strong class="footer-branch-name">Matale</strong>
                            <p>78 Colombo Road, Matale 21000</p>
                            <p>066 222 3344</p>
                            <p>Mon–Sat: 8AM–9PM | Sun: 9AM–7PM</p>
                        </div>
                        <div class="footer-branch-item">
                            <strong class="footer-branch-name">Wattala</strong>
                            <p>34 Negombo Road, Wattala 11300</p>
                            <p>011 294 5566</p>
                            <p>Mon–Sun: 8:00 AM – 10:00 PM</p>
                        </div>
                    </div>`;

let totalChanges = 0;

HTML_FILES.forEach(file => {
    let html = fs.readFileSync(path.join(DIR, file), 'utf8');
    let changes = 0;

    // --- PROMPT 1A: Remove header-topbar ---
    const topbarRegex = /\s*<!-- Row 1: Topbar -->\s*\n?\s*<div class="header-topbar">[\s\S]*?<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>/;
    if (topbarRegex.test(html)) {
        html = html.replace(topbarRegex, '');
        changes++;
    }
    // Alternate pattern
    const topbarRegex2 = /<div class="header-topbar">[\s\S]*?<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>/;
    // Only if the first one didn't work
    if (changes === 0 && topbarRegex2.test(html)) {
        // More careful: remove lines between header-topbar start and its closing
        const lines = html.split('\n');
        let inTopbar = false;
        let braceCount = 0;
        let removeStart = -1;
        let removeEnd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('header-topbar')) {
                inTopbar = true;
                removeStart = i;
                // Check for comment above
                if (i > 0 && lines[i - 1].includes('Row 1: Topbar')) removeStart = i - 1;
                braceCount = 0;
            }
            if (inTopbar) {
                const opens = (lines[i].match(/<div/g) || []).length;
                const closes = (lines[i].match(/<\/div>/g) || []).length;
                braceCount += opens - closes;
                if (braceCount <= 0) {
                    removeEnd = i;
                    break;
                }
            }
        }
        if (removeStart >= 0 && removeEnd >= 0) {
            lines.splice(removeStart, removeEnd - removeStart + 1);
            html = lines.join('\n');
            changes++;
        }
    }

    // --- PROMPT 1B: Add branch pills to header-main after logo ---
    if (!html.includes('header-branch-pills') && html.includes('header-main')) {
        // Insert after the site-logo closing </a> tag in header-main
        html = html.replace(
            /(<a href="index\.html" class="site-logo">[\s\S]*?<\/a>)\s*\n(\s*<div class="header-search">)/,
            `$1\n${BRANCH_PILLS}\n$2`
        );
        changes++;
    }

    // --- PROMPT 1C: Remove decorative symbols from text ---
    // Remove Mojibake patterns (encoded emojis that display as garbage)
    html = html.replace(/ðŸ§®/g, '');
    html = html.replace(/ðŸ"¦/g, '');
    html = html.replace(/ðŸ"¬/g, '');
    html = html.replace(/â†'/g, '→');
    html = html.replace(/â€"/g, '—');
    html = html.replace(/âœ"/g, '✓');
    // Remove ✦ ✧ ★ ☆ from non-chatbot/non-category contexts
    // (Only from headings, nav, section titles)

    // --- PROMPT 2: Add dns-prefetch if not present ---
    if (!html.includes('dns-prefetch') && html.includes('<head>')) {
        html = html.replace(
            /<link rel="icon"/,
            '<link rel="dns-prefetch" href="https://images.unsplash.com">\n    <link rel="icon"'
        );
        changes++;
    }

    // --- PROMPT 4C: Update Malee greeting ---
    if (html.includes(OLD_MALEE)) {
        html = html.replace(OLD_MALEE, NEW_MALEE);
        changes++;
    }
    if (html.includes(OLD_MALEE2)) {
        html = html.replace(OLD_MALEE2, NEW_MALEE);
        changes++;
    }

    // --- PROMPT 6: Add page loader ---
    if (!html.includes('page-loader') && html.includes('<body>')) {
        html = html.replace('<body>', '<body>' + PAGE_LOADER);
        changes++;
    }

    // --- PROMPT 6: Add loader script in head ---
    if (!html.includes('page-loader') || !html.includes('loader.classList.add')) {
        if (html.includes('</head>') && !html.includes('loader.classList.add')) {
            html = html.replace('</head>', LOADER_SCRIPT + '</head>');
            changes++;
        }
    }

    // --- PROMPT 5C: Update footer Quick Info col to branch details ---
    // Replace the simple "Quick Info" footer column with branch details
    const quickInfoRegex = /<div class="footer-col">\s*\n\s*<h4 class="footer-heading">Quick Info<\/h4>[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>/;
    if (quickInfoRegex.test(html)) {
        html = html.replace(quickInfoRegex, NEW_FOOTER_BRANCHES + '\n                </div>\n            </div>\n        </div>');
        changes++;
    }

    // --- PROMPT 5B: Update "Sign In" button to go to login.html ---
    if (html.includes("onclick=\"window.loginWithPhone(prompt('Enter Phone Number'))\"")) {
        html = html.replace(
            /onclick="window\.loginWithPhone\(prompt\('Enter Phone Number'\)\)">Sign In/g,
            'onclick="window.location.href=\'login.html\'">Sign In'
        );
        changes++;
    }

    // --- Add loading="lazy" to images missing it ---
    html = html.replace(/<img(?![^>]*loading=)([^>]*>)/g, '<img loading="lazy"$1');

    // Write file back
    if (changes > 0) {
        fs.writeFileSync(path.join(DIR, file), html, 'utf8');
        console.log(`✅ ${file}: ${changes} changes`);
        totalChanges += changes;
    } else {
        console.log(`⏭️  ${file}: no changes needed`);
    }
});

console.log(`\nDone! Total changes: ${totalChanges} across ${HTML_FILES.length} files`);
