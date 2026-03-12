const fs = require('fs');
const files = ['index.html', 'about.html', 'account.html', 'branches.html', 'cart.html', 'checkout.html', 'contact.html', 'login.html', 'loyalty.html', 'offers.html', 'product-detail.html', 'products.html', 'promotions.html', 'rates.html', 'search-results.html', 'stock.html'];
const chatbotHtml = `
    <!-- AI Chatbot Malee -->
    <div id="malee-trigger" class="chatbot-trigger" onclick="window.toggleMalee()">
        <i class="fas fa-robot"></i>
    </div>

    <div id="malee-window" class="chatbot-window">
        <div class="chatbot-header">
            <span>Malee — Multi Super AI</span>
            <i class="fas fa-times" style="cursor: pointer;" onclick="window.toggleMalee()"></i>
        </div>
        <div id="malee-messages" class="chatbot-messages">
            <div class="chat-msg bot">Ayubowan! &#128591; I'm Malee, your friendly Multi Super AI. What can I help you
                with
                today?</div>
            <div class="quick-replies">
                <button onclick="window.sendMaleeMessage('Branches')">&#127978; Branches</button>
                <button onclick="window.sendMaleeMessage('Hot Offers')">&#128293; Hot Offers</button>
                <button onclick="window.sendMaleeMessage('Loyalty Card')">&#128179; Loyalty Card</button>
                <button onclick="window.sendMaleeMessage('Products')">&#128722; Products</button>
                <button onclick="window.sendMaleeMessage('Rates')">&#128202; Today\'s Rates</button>
                <button onclick="window.sendMaleeMessage('Stock Check')">&#128230; Stock Check</button>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="malee-input" placeholder="Ask me anything..."
                onkeypress="if(event.key === 'Enter') window.sendMaleeMessage()">
            <button onclick="window.sendMaleeMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
`;

files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        if (!content.includes('id="malee-trigger"')) {
            content = content.replace('</body>', chatbotHtml + '\n</body>');
            fs.writeFileSync(f, content);
            console.log('Added chatbot to ' + f);
        } else {
            console.log('Chatbot already in ' + f);
        }
    } catch(err) {
        console.log('Error reading ' + f);
    }
});
