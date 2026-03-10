const fs = require('fs');

const newHeaderTemplate = `    <!-- Site Header -->
    <header class="site-header">
        <!-- Row 1: Topbar -->
        <div class="header-topbar">
            <div class="container flex justify-between align-center">
                <div class="topbar-branches">
                    <span class="icon">📍</span>
                    <button class="branch-pill active" onclick="window.setSelectedBranch('akurana')">Akurana</button>
                    <button class="branch-pill" onclick="window.setSelectedBranch('kandy')">Kandy</button>
                    <button class="branch-pill" onclick="window.setSelectedBranch('matale')">Matale</button>
                    <button class="branch-pill" onclick="window.setSelectedBranch('wattala')">Wattala</button>
                </div>
                <div class="topbar-info hide-mobile">
                    <span>📞 081 230 4455</span>
                    <span>🕐 7:30 AM – 9:30 PM</span>
                </div>
            </div>
        </div>

        <!-- Row 2: Main Header -->
        <div class="header-main">
            <div class="container flex align-center gap-4">
                <a href="index.html" class="site-logo">
                    <span class="logo-multi">Multi</span><span class="logo-super">Super</span>
                </a>

                <div class="header-search">
                    <form class="search-wrap" onsubmit="event.preventDefault(); window.location.href='products.html?q=' + this.querySelector('input').value;">
                        <input type="text" placeholder="Search products, brands, categories...">
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div class="header-actions">
                    <button class="btn btn-outline btn-account hidden logged-out-only" onclick="window.loginWithPhone(prompt('Enter Phone Number'))">Sign In</button>
                    <a href="account.html" class="btn btn-outline btn-account hidden logged-in-only">My Account</a>
                    <div class="points-badge hidden logged-in-only"><span id="user-points-display">0</span> pts</div>
                    <button class="hamburger"><i class="fas fa-bars"></i></button>
                </div>
            </div>
        </div>

        <!-- Row 3: Navigation -->
        <div class="header-nav hide-mobile">
            <div class="container flex">
                <a href="index.html" class="nav-link{{index_active}}">Home</a>
                <a href="offers.html" class="nav-link{{offers_active}}">Weekly Offers</a>
                <a href="rates.html" class="nav-link{{rates_active}}">Today's Rates</a>
                <a href="products.html" class="nav-link{{products_active}}">Products</a>
                <a href="stock.html" class="nav-link{{stock_active}}">Stock Check</a>
                <a href="pamphlet.html" class="nav-link{{pamphlet_active}}">Pamphlet</a>
                <a href="about.html" class="nav-link{{about_active}}">About Us</a>
                <a href="contact.html" class="nav-link{{contact_active}}">Contact</a>
            </div>
        </div>
    </header>`;

const newFooterTemplate = `    <!-- Footer (New 4-zone structure) -->
    <footer class="site-footer">
        <!-- Zone 1: Newsletter -->
        <div class="footer-newsletter">
            <div class="container">
                <div>
                    <h3>📬 Get Next Week's Offers</h3>
                    <p>Sent every Sunday evening — before the offers hit the stores</p>
                </div>
                <div class="newsletter-form">
                    <input type="email" id="footer-newsletter-email" placeholder="Email address...">
                    <button onclick="if(document.getElementById('footer-newsletter-email').value.includes('@')) { window.showToast('Subscribed to Weekly Offers!', 'success'); setTimeout(() => window.location.href='pamphlet.html', 1500); } else { window.showToast('Please enter a valid email', 'error'); }">Subscribe</button>
                </div>
            </div>
        </div>

        <!-- Zone 2: Main Footer -->
        <div class="footer-main">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="index.html" class="site-logo">
                            <span class="logo-multi">Multi</span><span class="logo-super">Super</span>
                        </a>
                        <p>Your local regional supermarket providing everything you need close to home.</p>
                        <div class="footer-social">
                            <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-btn"><i class="fab fa-whatsapp"></i></a>
                            <a href="#" class="social-btn"><i class="fab fa-instagram"></i></a>
                        </div>
                        <p style="font-size: 0.8rem; margin-top: 20px; color: var(--color-text-muted);">Photos: Unsplash</p>
                    </div>
                    <div class="footer-links-grid">
                        <div class="footer-col">
                            <h4 class="footer-heading">Shop</h4>
                            <a href="offers.html">Latest Offers</a>
                            <a href="products.html">Product List</a>
                            <a href="rates.html">Daily Rates</a>
                            <a href="stock.html">Stock Check</a>
                        </div>
                        <div class="footer-col">
                            <h4 class="footer-heading">Company</h4>
                            <a href="about.html">About Us</a>
                            <a href="contact.html">Contact Us</a>
                            <a href="branches.html">Our Branches</a>
                            <a href="pamphlet.html">Subscriptions</a>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h4 class="footer-heading">Quick Info</h4>
                        <div class="contact-item"><i class="fas fa-phone"></i> 081 230 4455</div>
                        <div class="contact-item"><i class="fas fa-envelope"></i> help@multisuper.lk</div>
                        <div class="contact-item"><i class="fas fa-clock"></i> 7:30 AM - 9:30 PM</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Zone 3: Footer Bottom -->
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 Multi Super Markets (Pvt) Ltd. All rights reserved.</p>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;

const noticeTemplate = `    <!-- Desktop Site Notice -->
    <div class="desktop-notice">Best viewed on a desktop monitor for the full regional experience.</div>

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
            <div class="chat-msg bot">Hi! I'm Malee. How can I help you today? You can ask me about our branches, offers, or loyalty points!</div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="malee-input" placeholder="Type a message..." onkeypress="if(event.key === 'Enter') window.sendMaleeMessage()">
            <button onclick="window.sendMaleeMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>`;

const navRegex = /^[ \t]*<!-- Site Header -->\s*<header class="site-header">[\s\S]*?<\/header>/m;
const footerRegex = /^[ \t]*<!-- Footer [\s\S]*?-->\s*<footer class="site-footer">[\s\S]*?<\/footer>/m;
const oldNavRegex = /^[ \t]*<!-- Navbar -->\s*<nav class="navbar">[\s\S]*?<\/nav>/m;
const oldFooterRegex = /^[ \t]*<!-- Footer -->\s*<footer class="footer">[\s\S]*?<\/footer>/m;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    let actives = {
        'index_active': '', 'offers_active': '', 'rates_active': '',
        'products_active': '', 'stock_active': '', 'pamphlet_active': '',
        'branches_active': '', 'about_active': '', 'contact_active': ''
    };
    let key = file.replace('.html', '_active');
    if (actives[key] !== undefined) {
        actives[key] = ' active';
    }

    let header = newHeaderTemplate
        .replace('{{index_active}}', actives['index_active'])
        .replace('{{offers_active}}', actives['offers_active'])
        .replace('{{rates_active}}', actives['rates_active'])
        .replace('{{products_active}}', actives['products_active'])
        .replace('{{stock_active}}', actives['stock_active'])
        .replace('{{pamphlet_active}}', actives['pamphlet_active'])
        .replace('{{about_active}}', actives['about_active'])
        .replace('{{contact_active}}', actives['contact_active'])
        .replace('{{branches_active}}', actives['branches_active']);

    let updated = false;

    // Inject notice and chatbot if missing
    if (!content.includes('chatbot-trigger')) {
        content = content.replace('<body>', '<body>' + noticeTemplate);
        updated = true;
    }

    // Update Header
    if (navRegex.test(content)) {
        content = content.replace(navRegex, header);
        updated = true;
    } else if (oldNavRegex.test(content)) {
        content = content.replace(oldNavRegex, header);
        updated = true;
    }

    // Update Footer
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooterTemplate);
        updated = true;
    } else if (oldFooterRegex.test(content)) {
        content = content.replace(oldFooterRegex, newFooterTemplate);
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No match in ${file}`);
    }
}
