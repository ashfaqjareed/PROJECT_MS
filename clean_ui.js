const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;

    // 1. 2025 to 2026 Copyright
    content = content.replace(/2025 Multi Super/g, '2026 Multi Super');

    // 2. Remove demo string
    const demoRegex1 = /<p[^>]*>This is a demo website built for presentation purposes only\. Not the official Multi Super website\.<\/p>/gi;
    content = content.replace(demoRegex1, '');

    const demoRegex2 = /This is a demo website built for presentation purposes only\. Not the official Multi Super website\./gi;
    content = content.replace(demoRegex2, '');

    // 3. Fix weird symbols in header toggle buttons
    const btnRegex = /<button class="(?:[^"]*\s)?header-toggle-btn(?:\s[^"]*)?"[^>]*>([^<]+)<\/button>/gi;
    content = content.replace(btnRegex, (match, innerText) => {
        if (innerText.includes('?') || innerText.includes('') || innerText.includes('~')) {
            return match.replace(innerText, '<i class="fas fa-bars"></i>');
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', file);
    }
});
