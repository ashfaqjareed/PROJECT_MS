const fs = require('fs');

const newChatbotTemplate = `    <!-- AI Chatbot Malee -->
    <div id="malee-trigger" class="chatbot-trigger" onclick="window.toggleMalee()">
        <i class="fas fa-robot"></i>
    </div>

    <div id="malee-window" class="chatbot-window">
        <div class="chatbot-header">
            <span>Malee — Multi Super AI</span>
            <i class="fas fa-times" style="cursor: pointer;" onclick="window.toggleMalee()"></i>
        </div>
        <div id="malee-messages" class="chatbot-messages">
            <div class="chat-msg bot">Ayubowan! 🙏 I'm Malee, your friendly Multi Super AI. What can I help you with today?</div>
            <div class="quick-replies">
                <button onclick="window.sendMaleeMessage('Branches')">🏪 Branches</button>
                <button onclick="window.sendMaleeMessage('Hot Offers')">🔥 Hot Offers</button>
                <button onclick="window.sendMaleeMessage('Loyalty Card')">💳 Loyalty Card</button>
                <button onclick="window.sendMaleeMessage('Products')">🛒 Products</button>
                <button onclick="window.sendMaleeMessage('Rates')">📊 Today's Rates</button>
                <button onclick="window.sendMaleeMessage('Stock Check')">📦 Stock Check</button>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="malee-input" placeholder="Ask me anything..." onkeypress="if(event.key === 'Enter') window.sendMaleeMessage()">
            <button onclick="window.sendMaleeMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>`;

const chatbotRegex = /^[ \t]*<!-- AI Chatbot Malee -->[\s\S]*?<div id="malee-window" class="chatbot-window">[\s\S]*?<div class="chatbot-input">[\s\S]*?<\/div>[\s\S]*?<\/div>/m;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalUpdated = 0;
for (let file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    if (chatbotRegex.test(content)) {
        content = content.replace(chatbotRegex, newChatbotTemplate);
        fs.writeFileSync(file, content);
        console.log(`✅ Updated chatbot in ${file}`);
        totalUpdated++;
    } else {
        console.log(`❌ Chatbot block not found in ${file}`);
    }
}
console.log(`Done. Updated ${totalUpdated} files.`);
