const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Ashfaq Jareed/Downloads/ANTIGRAVITY/PROJECT_MS';

const htmlFiles = [
    'about.html', 'account.html', 'branches.html', 'cart.html', 'checkout.html', 
    'contact.html', 'index.html', 'login.html', 'loyalty.html', 'offers.html', 
    'pamphlet.html', 'product-detail.html', 'products.html', 'promotions.html', 
    'rates.html', 'search-results.html', 'stock.html'
];

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix Character Encoding Artifacts
    // Replace the replacement char (U+FFFD) or other junk patterns
    content = content.replace(/Multi Super \ufffd/g, 'Multi Super \u2013');
    content = content.replace(/Malee \ufffd/g, 'Malee \u2013');
    content = content.replace(/\ufffd/g, '\u2013'); 
    content = content.replace(/\?\?/g, '\u2013'); // Common artifact from broken UTF-8

    // 2. Newsletter Refactor - Robust matching to catch original AND partially-corrupted states
    // This regex looks for the button tag that starts with newsletter-btn and has any mess inside its onclick
    const corruptBtnRegex = /<button class="newsletter-btn" onclick="window\.subscribeNewsletter\('footer-email-input'\)"[\s\S]*?>Subscribe<\/button>/g;
    const originalBtnRegex = /<button class="newsletter-btn" onclick="if\(!window\.getUser\(\)\)[\s\S]*?Subscribe<\/button>/g;
    
    content = content.replace(corruptBtnRegex, '<button class="newsletter-btn" onclick="window.subscribeNewsletter(\'footer-email-input\')">Subscribe</button>');
    content = content.replace(originalBtnRegex, '<button class="newsletter-btn" onclick="window.subscribeNewsletter(\'footer-email-input\')">Subscribe</button>');

    // 3. Chatbot Trigger Consistency
    content = content.replace(/<div id="malee-trigger" class="chatbot-trigger" onclick="window\.toggleMalee\(\)">[\s\S]*?<\/div>/g, 
                             '<div id="malee-trigger" class="chatbot-trigger" onclick="window.toggleMalee()"><img src="img/malee-avatar.png" alt="Malee AI" class="bot-avatar-img"></div>');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Site-wide cleanup completed successfully.');
