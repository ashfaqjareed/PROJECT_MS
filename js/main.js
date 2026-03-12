/**
 * Multi Super - Part 3: Shared Logic
 * The main functional engine for the website
 */

// --- 1. BRANCH SELECTOR ---
window.getSelectedBranch = () => {
    return localStorage.getItem('multisuper_branch') || 'akurana-7mp';
};

window.setSelectedBranch = (id) => {
    localStorage.setItem('multisuper_branch', id);
    window.onBranchChange();
};

window.onBranchChange = () => {
    const branchId = window.getSelectedBranch();
    const branch = window.getBranchById(branchId);

    // Update display text in navbar
    const display = document.getElementById('current-branch');
    if (display) display.textContent = branch.name;

    // Trigger page-specific re-render if defined
    if (typeof window.onBranchChanged === 'function') {
        window.onBranchChanged(branchId);
    }

    window.showToast(`Now showing offers for ${branch.name}`, 'info');
};

window.initBranchSelector = () => {
    // Use the new header branch pills
    const pills = document.querySelectorAll('.header-branch-pills .branch-pill');
    if (!pills.length) return;

    const currentId = window.getSelectedBranch();
    pills.forEach(pill => {
        const bid = pill.dataset.branch || pill.textContent.trim().toLowerCase();
        pill.classList.toggle('active', bid === currentId);
    });
};

// --- 2. AUTHENTICATION (FIREBASE) ---
window.currentUserDoc = null;

// Listen for global auth state changes (wrapped in try-catch for non-Firebase environments)
try {
    if (typeof auth !== 'undefined' && auth && auth.onAuthStateChanged) {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const phone = user.email.split('@')[0];
                    const docRef = db.collection('customers').doc(phone);
                    const docSnap = await docRef.get();

                    if (docSnap.exists) {
                        window.currentUserDoc = docSnap.data();
                        if (!window.currentUserDoc.recentTransactions) {
                            window.currentUserDoc.recentTransactions = [];
                        }
                    } else {
                        console.error("No customer profile found in Firestore!");
                        window.currentUserDoc = null;
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    window.currentUserDoc = null;
                }
            } else {
                window.currentUserDoc = null;
            }

            window.updateNavAuth();

            if (typeof window.onAuthStateRestored === 'function') {
                window.onAuthStateRestored(user, window.currentUserDoc);
            }
        });
    } else {
        // Firebase not loaded — use mock login system
        window.updateNavAuth = window.updateNavAuth || function () { };
    }
} catch (e) {
    console.warn('Firebase auth not available, using local mock system:', e.message);
}

window.getUser = () => {
    return window.currentUserDoc;
};

window.logoutUser = async () => {
    try {
        if (typeof auth !== 'undefined' && auth && auth.signOut) {
            await auth.signOut();
        }
        window.currentUserDoc = null;
        window.updateNavAuth();
        window.showToast('Successfully logged out', 'info');
    } catch (e) {
        console.error("Logout Error:", e);
    }
};

/* ── AUTH HELPERS ───────────────────────────────────── */
function getUser() {
    try {
        var raw = sessionStorage.getItem('msUser') || localStorage.getItem('msUser');
        return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
}
function saveUser(data) {
    var str = JSON.stringify(data);
    sessionStorage.setItem('msUser', str);
    localStorage.setItem('msUser', str);
}
function clearUser() {
    sessionStorage.removeItem('msUser');
    localStorage.removeItem('msUser');
}

/* ── SWITCH TAB ON LOGIN PAGE ───────────────────────── */
function switchLoginTab(tab) {
    var signin = document.getElementById('panel-signin');
    var signup = document.getElementById('panel-signup');
    var btnSi = document.getElementById('tab-signin-btn');
    var btnSu = document.getElementById('tab-signup-btn');
    if (!signin) return;
    if (tab === 'signin') {
        signin.style.display = 'block';
        signup.style.display = 'none';
        btnSi.classList.add('active');
        btnSu.classList.remove('active');
    } else {
        signin.style.display = 'none';
        signup.style.display = 'block';
        btnSi.classList.remove('active');
        btnSu.classList.add('active');
    }
}

// Handle login.html?tab=signup URL param
(function () {
    if (window.location.pathname.includes('login.html')) {
        var params = new URLSearchParams(window.location.search);
        if (params.get('tab') === 'signup' || window.location.hash === '#signup') {
            setTimeout(function () { switchLoginTab('signup'); }, 50);
        }
    }
})();

/* ── SIGN IN ────────────────────────────────────────── */
function doSignIn() {
    var phoneRaw = (document.getElementById('si-phone') || {}).value || '';
    var pin = (document.getElementById('si-pin') || {}).value || '';
    var errEl = document.getElementById('si-error');
    var succEl = document.getElementById('si-success');
    function showErr(msg) {
        if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    }
    phoneRaw = phoneRaw.replace(/\s/g, '');
    if (phoneRaw.length < 9) { showErr('Please enter your 9-digit phone number.'); return; }
    if (!pin || pin.length < 4) { showErr('Please enter your PIN.'); return; }
    var fullPhone = '0' + phoneRaw;
    var email = fullPhone + '@multisuper.lk';
    // Show loading state
    var btn = document.querySelector('#panel-signin .btn-primary');
    if (btn) { btn.textContent = 'Signing in...'; btn.disabled = true; }
    firebase.auth().signInWithEmailAndPassword(email, pin)
        .then(function () {
            return firebase.firestore().collection('customers').doc(fullPhone).get();
        })
        .then(function (doc) {
            var data = doc.exists
                ? doc.data()
                : {
                    name: 'Customer', phone: fullPhone, points: 0, tier: 'Bronze',
                    cardNumber: 'MS-' + fullPhone.slice(-4), memberSince: new Date().toISOString().split('T')[0]
                };
            saveUser(data);
            updateNavAuth();
            if (errEl) errEl.style.display = 'none';
            // Show the two choice buttons
            var formEls = document.querySelectorAll('#panel-signin .form-group, #panel-signin .btn-full');
            formEls.forEach(function (el) { el.style.display = 'none'; });
            var msg = document.getElementById('si-welcome-msg');
            if (msg) msg.textContent = 'Welcome back, ' + (data.name || '').split(' ')[0] + '! You have ' + (data.points || 0) + ' loyalty points.';
            if (succEl) succEl.style.display = 'block';
        })
        .catch(function (err) {
            if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false; }
            if (err.code === 'auth/user-not-found') {
                showErr('Phone number not found. Please sign up for a new account.');
                // After 1 failed attempt, auto-switch to Sign Up tab
                setTimeout(function () { switchLoginTab('signup'); }, 1800);
            } else if (err.code === 'auth/wrong-password') {
                showErr('Incorrect PIN. Please try again.');
                if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false; }
            } else {
                showErr(err.message || 'Something went wrong. Please try again.');
                if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false; }
            }
        });
}

/* ── SIGN UP ────────────────────────────────────────── */
function doSignUp() {
    var name = (document.getElementById('su-name') || {}).value || '';
    var phoneRaw = (document.getElementById('su-phone') || {}).value || '';
    var pin = (document.getElementById('su-pin') || {}).value || '';
    var branch = (document.getElementById('su-branch') || {}).value || '';
    var errEl = document.getElementById('su-error');
    function showErr(msg) {
        if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    }
    name = name.trim();
    phoneRaw = phoneRaw.replace(/\s/g, '');
    if (name.length < 2) { showErr('Please enter your full name (at least 2 characters).'); return; }
    if (phoneRaw.length < 9) { showErr('Please enter your 9-digit phone number.'); return; }
    if (pin.length < 4) { showErr('PIN must be at least 4 digits.'); return; }
    if (!branch) { showErr('Please select your home branch.'); return; }
    var fullPhone = '0' + phoneRaw;
    var email = fullPhone + '@multisuper.lk';
    var cardNumber = 'MS-' + Date.now().toString().slice(-6);
    var btn = document.querySelector('#panel-signup .btn-primary');
    if (btn) { btn.textContent = 'Creating account...'; btn.disabled = true; }
    if (errEl) errEl.style.display = 'none';
    firebase.auth().createUserWithEmailAndPassword(email, pin)
        .then(function () {
            var userData = {
                name: name,
                phone: fullPhone,
                email: email,
                cardNumber: cardNumber,
                memberSince: new Date().toISOString().split('T')[0],
                tier: 'Bronze',
                points: 0,
                totalSpent: 0,
                homeBranch: branch,
                transactions: []
            };
            return firebase.firestore().collection('customers').doc(fullPhone)
                .set(userData).then(function () { return userData; });
        })
        .then(function (userData) {
            saveUser(userData);
            updateNavAuth();
            // Auto-redirect to account page after 1.2 seconds
            showToast('Account created! Redirecting to your account...', 'success');
            setTimeout(function () {
                window.location.href = 'account.html';
            }, 1200);
        })
        .catch(function (err) {
            if (btn) { btn.textContent = 'Create My Account →'; btn.disabled = false; }
            if (err.code === 'auth/email-already-in-use') {
                showErr('This phone number already has an account. Please sign in instead.');
                setTimeout(function () { switchLoginTab('signin'); }, 1800);
            } else if (err.code === 'auth/weak-password') {
                showErr('PIN must be at least 6 characters for security.');
            } else if (err.code === 'auth/network-request-failed') {
                showErr('Network error. Check your connection and try again.');
            } else {
                showErr('Could not create account: ' + (err.message || 'Unknown error'));
            }
        });
}

/* ── LOGOUT ─────────────────────────────────────────── */
function logoutUser() {
    firebase.auth().signOut().then(function () {
        clearUser();
        updateNavAuth();
        showToast('You have been signed out.', 'info');
        setTimeout(function () { window.location.href = 'index.html'; }, 900);
    });
}

/* ── UPDATE NAV AUTH STATE ──────────────────────────── */
function updateNavAuth() {
    var user = getUser();

    // Support both ID-based (most pages) and class-based (login.html) headers
    var loggedOut = document.getElementById('auth-logged-out')
        || document.getElementById('nav-auth-logged-out');
    var loggedIn = document.getElementById('auth-logged-in')
        || document.getElementById('nav-auth-logged-in');

    // Also support class-based selectors from login.html header
    var loginBtn = document.querySelector('.nav-login-btn');
    var userBtn = document.querySelector('.nav-user-btn');
    var userDropdown = document.querySelector('.user-dropdown');

    var userName = document.getElementById('user-trigger-name');
    var avatar = document.getElementById('user-avatar-initial');
    var dropName = document.getElementById('dropdown-user-name');
    var dropPhone = document.getElementById('dropdown-user-phone');

    if (user) {
        // Hide logged-out elements
        if (loggedOut) loggedOut.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'none';

        // Show logged-in elements
        if (loggedIn) loggedIn.style.display = 'flex';
        if (userBtn) userBtn.style.display = 'flex';

        var first = (user.name || 'User').split(' ')[0];
        if (userName) userName.textContent = first;
        if (avatar) avatar.textContent = first.charAt(0).toUpperCase();
        if (dropName) dropName.textContent = user.name || 'User';
        if (dropPhone) dropPhone.textContent = user.phone || '';

        // Also set the span inside .nav-user-btn
        var userBtnSpan = userBtn ? userBtn.querySelector('span') : null;
        if (userBtnSpan) userBtnSpan.textContent = first;

        // Show "My Account" nav link if it exists
        var navAccLi = document.getElementById('nav-account-li')
            || document.getElementById('nav-my-account');
        if (navAccLi) navAccLi.style.display = '';

    } else {
        // Show logged-out elements
        if (loggedOut) loggedOut.style.display = 'flex';
        if (loginBtn) loginBtn.style.display = '';

        // Hide logged-in elements
        if (loggedIn) loggedIn.style.display = 'none';
        if (userBtn) userBtn.style.display = 'none';
        if (userDropdown) userDropdown.classList.remove('open');

        // Hide "My Account" nav link
        var navAccLi = document.getElementById('nav-account-li')
            || document.getElementById('nav-my-account');
        if (navAccLi) navAccLi.style.display = 'none';
    }
}

/* ── HOME PAGE: "HAVE A LOYALTY CARD?" quick check ─── /
/ This is for the strip on index.html                  */
function checkLoyaltyCard() {
    var input = document.getElementById('loyalty-phone-input');
    var errEl = document.getElementById('loyalty-check-error');
    var succEl = document.getElementById('loyalty-check-success');
    if (!input) return;
    var phoneRaw = input.value.replace(/\s/g, '');
    if (phoneRaw.length < 9) {
        if (errEl) { errEl.textContent = 'Please enter a valid 9-digit number.'; errEl.style.display = 'block'; }
        return;
    }
    var fullPhone = '0' + phoneRaw;
    if (errEl) errEl.style.display = 'none';
    firebase.firestore().collection('customers').doc(fullPhone).get()
        .then(function (doc) {
            if (doc.exists) {
                var data = doc.data();
                saveUser(data);
                updateNavAuth();
                // Show two options: Back to Home or Account Page
                var card = document.getElementById('loyalty-check-card');
                if (card) card.innerHTML =
                    '<div class="loyalty-found">' +
                    '<div class="loyalty-found-icon">✓</div>' +
                    '<p>Found your account, <strong>' + (data.name || '').split(' ')[0] + '</strong>! You have <strong>' + (data.points || 0) + ' points</strong>.</p>' +
                    '<div class="loyalty-found-btns">' +
                    '<a href="index.html" class="btn btn-outline">← Back to Home</a>' +
                    '<a href="account.html" class="btn btn-primary">My Account →</a>' +
                    '</div>' +
                    '</div>';
            } else {
                // Phone not found — push to sign up
                if (errEl) {
                    errEl.textContent = 'No account found for this number. Sign up to create one!';
                    errEl.style.display = 'block';
                }
                setTimeout(function () {
                    window.location.href = 'login.html?tab=signup';
                }, 1600);
            }
        })
        .catch(function () {
            if (errEl) { errEl.textContent = 'Could not connect. Check your internet and try again.'; errEl.style.display = 'block'; }
        });
}

// Expose auth functions globally for login.html and header
window.logoutUser = logoutUser;
window.updateNavAuth = updateNavAuth;
window.doSignIn = doSignIn;
window.doSignUp = doSignUp;
window.switchLoginTab = switchLoginTab;
window.checkLoyaltyCard = checkLoyaltyCard;

// handleLogin / handleRegister — called by login.html's submitLogin() and submitRegister()
window.handleLogin = async (phone, pin) => {
    phone = phone.replace(/\s/g, '');
    if (phone.length < 9) {
        showToast('Please enter your 9-digit phone number.', 'error');
        return;
    }
    if (!pin || pin.length < 4) {
        showToast('Please enter your PIN.', 'error');
        return;
    }
    var fullPhone = phone.startsWith('0') ? phone : '0' + phone;
    var email = fullPhone + '@multisuper.lk';

    try {
        await firebase.auth().signInWithEmailAndPassword(email, pin);
        var doc = await firebase.firestore().collection('customers').doc(fullPhone).get();
        var data = doc.exists
            ? doc.data()
            : {
                name: 'Customer', phone: fullPhone, points: 0, tier: 'Bronze',
                cardNumber: 'MS-' + fullPhone.slice(-4),
                memberSince: new Date().toISOString().split('T')[0]
            };
        saveUser(data);
        updateNavAuth();
        showToast('Welcome back, ' + (data.name || '').split(' ')[0] + '!', 'success');
        window.location.href = 'account.html';
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            showToast('Phone number not found. Please sign up.', 'error');
        } else if (err.code === 'auth/wrong-password') {
            showToast('Incorrect PIN. Please try again.', 'error');
        } else {
            showToast(err.message || 'Sign-in failed. Try again.', 'error');
        }
    }
};

window.handleRegister = async (data) => {
    var name = (data.name || '').trim();
    var phoneRaw = (data.phone || '').replace(/\s/g, '');
    var pin = data.pin || '';
    var email = data.email || '';

    if (name.length < 2) { showToast('Please enter your full name.', 'error'); return; }
    if (phoneRaw.length < 9) { showToast('Please enter a valid phone number.', 'error'); return; }
    if (pin.length < 4) { showToast('PIN must be at least 4 digits.', 'error'); return; }

    var fullPhone = phoneRaw.startsWith('0') ? phoneRaw : '0' + phoneRaw;
    var authEmail = fullPhone + '@multisuper.lk';
    var cardNumber = 'MS-' + Date.now().toString().slice(-6);

    try {
        await firebase.auth().createUserWithEmailAndPassword(authEmail, pin);
        var userData = {
            name: name,
            phone: fullPhone,
            email: email || authEmail,
            cardNumber: cardNumber,
            memberSince: new Date().toISOString().split('T')[0],
            tier: 'Bronze',
            points: 0,
            totalSpent: 0,
            transactions: []
        };
        await firebase.firestore().collection('customers').doc(fullPhone).set(userData);
        saveUser(userData);
        updateNavAuth();
        showToast('Account created! Redirecting...', 'success');
        window.location.href = 'account.html';
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            showToast('This phone already has an account. Please sign in.', 'error');
        } else if (err.code === 'auth/weak-password') {
            showToast('PIN must be at least 6 characters.', 'error');
        } else {
            showToast(err.message || 'Registration failed.', 'error');
        }
    }
};

// Dropdown Toggle Logic — works with both old and new header IDs
(function () {
    // Try the new header IDs first, fall back to legacy
    var trigger = document.getElementById('header-user-trigger')
        || document.querySelector('.nav-user-btn');
    var dropdown = document.getElementById('header-user-dropdown')
        || document.querySelector('.user-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
    });

    // Mouse enter / leave for hover-based dropdown
    var wrap = trigger.closest('.header-account-wrap') || trigger.parentElement;
    if (wrap) {
        wrap.addEventListener('mouseenter', function () {
            dropdown.classList.add('open');
        });
        wrap.addEventListener('mouseleave', function () {
            dropdown.classList.remove('open');
        });
    }

    document.addEventListener('click', function () {
        if (dropdown) dropdown.classList.remove('open');
    });
    dropdown.addEventListener('click', function (e) { e.stopPropagation(); });
})();


// --- 3. UI UTILITIES ---
window.showToast = (msg, type = 'info') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Limit to 3 toasts
    if (container.children.length >= 3) {
        container.removeChild(container.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${msg}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

window.formatPrice = (n) => {
    if (n === null || isNaN(n)) return "Rs. 0.00";
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2
    }).format(n).replace('LKR', 'Rs.');
};

window.handleImageError = function(img) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = true;
    img.style.display = 'none';
    const parent = img.parentElement;
    parent.style.position = 'relative';
    parent.style.background = '#f0f0f0';
    const fb = document.createElement('div');
    fb.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;inset:0;';
    const fbImg = document.createElement('img');
    fbImg.src = 'img/logo.png';
    fbImg.style.cssText = 'width:55%;opacity:0.12;filter:grayscale(100%);';
    fbImg.alt = 'Multi Super';
    fb.appendChild(fbImg);
    parent.appendChild(fb);
};

window.formatPoints = (n) => {
    return new Intl.NumberFormat('en-US').format(n || 0) + " pts";
};

window.getComingSaturday = () => {
    const d = new Date();
    d.setDate(d.getDate() + (6 - d.getDay() + 7) % 7);
    return d;
};

window.formatDate = (dateStr) => {
    let date;
    if (!dateStr) {
        date = window.getComingSaturday();
    } else {
        date = new Date(dateStr);
    }
    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// --- 4. RATE CALCULATOR ---
window.initRateCalc = (ratesSource = window.PRODUCT_RATES) => {
    const productSelect = document.getElementById('calc-product');
    const qtyInput = document.getElementById('calc-qty');
    const unitLabel = document.getElementById('calc-unit');
    const resultDiv = document.getElementById('calc-result');
    const resetBtn = document.getElementById('calc-reset');

    if (!productSelect || !qtyInput || !resultDiv) return;

    // Populate select
    productSelect.innerHTML = '<option value="" disabled selected>Select an item...</option>';
    ratesSource.forEach(prod => {
        const opt = document.createElement('option');
        opt.value = prod.name;
        opt.textContent = prod.name;
        productSelect.appendChild(opt);
    });

    const calculate = () => {
        const productName = productSelect.value;
        const qty = parseFloat(qtyInput.value) || 0;
        const product = ratesSource.find(p => p.name === productName);

        if (product) {
            if (unitLabel) unitLabel.textContent = `per ${product.unit}`;
            const total = product.price * qty;
            resultDiv.classList.remove('visible');
            setTimeout(() => {
                resultDiv.textContent = window.formatPrice(total);
                resultDiv.classList.add('visible');
            }, 50);
        }
    };

    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            productSelect.selectedIndex = 0;
            qtyInput.value = 1;
            if (unitLabel) unitLabel.textContent = "unit";
            resultDiv.textContent = "Rs. 0.00";
        });
    }

    productSelect.addEventListener('change', calculate);
    qtyInput.addEventListener('input', calculate);
};

// --- 5. COMPONENT BUILDERS ---
window.buildOfferCard = (offer, isHorizontal = false, isSlider = false) => {
    const savings = offer.originalPrice - offer.offerPrice;
    const savingsPercent = Math.round((savings / offer.originalPrice) * 100);
    const dateTo = window.formatDate(offer.validTo);

    // Category mapping for colors
    const catColors = {
        'Fresh Produce': '#4CAF50',
        'Meat & Fish': '#F44336',
        'Dairy': '#2196F3',
        'Rice & Grains': '#FF9800',
        'Beverages': '#795548',
        'Household': '#9C27B0',
        'Personal Care': '#E91E63'
    };
    const accentColor = catColors[offer.category] || '#D32F2F';

    const layoutClass = isHorizontal ? 'offer-card-horizontal' : '';
    const imgUrl = offer.image || '';
    
    var imgSrc = offer.image || '';
    var imgTag = imgSrc ? '<img src="' + imgSrc + '" alt="' + offer.title + '" style="width:100%;height:100%;object-fit:cover;" onerror="if(window.handleImageError) window.handleImageError(this);">' : '';
    var fallback = '<img src="img/logo.png" style="width:55%;opacity:0.12;filter:grayscale(100%)" alt="Multi Super">';
    var imgContent = imgSrc ? imgTag : fallback;

    return `
        <div class="offer-card anim ${layoutClass} ${offer.isHot ? 'hot-offer' : ''}" style="--accent: ${accentColor}; ${isSlider ? 'min-width: 280px; flex: 0 0 280px;' : ''}">
            <div class="offer-badge-wrap">
                <div class="offer-save-badge">SAVE ${window.formatPrice(savings)}</div>
                ${offer.isHot ? '<div class="hot-tag">🔥 HOT</div>' : ''}
            </div>
            
            <div class="offer-image" style="position:relative;background:#f5f5f5;display:flex;align-items:center;justify-content:center;">
                ${imgContent}
                <div class="offer-cat-pill">${offer.category}</div>
            </div>

            <div class="offer-details">
                <div class="offer-header">
                    <h3 class="offer-title">${offer.title}</h3>
                    <span class="offer-unit">${offer.unit}</span>
                </div>
                <p class="offer-desc">${offer.description}</p>
                
                <div class="offer-pricing-panel">
                    <div class="price-main">
                        <span class="price-current">${window.formatPrice(offer.offerPrice)}</span>
                        <span class="price-was">Was ${window.formatPrice(offer.originalPrice)}</span>
                    </div>
                    <div class="price-discount-tag">${savingsPercent}% OFF</div>
                </div>

                <div class="offer-footer">
                    <div class="offer-valid">
                        <i class="far fa-clock"></i> Ends ${dateTo}
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.buildRateRow = (product) => {
    const diff = product.price - product.previousPrice;
    let trendIcon = '<i class="fas fa-right-long" style="color: #6B7280"></i>';
    if (diff > 0) trendIcon = '<i class="fas fa-arrow-up" style="color: var(--color-error)"></i>';
    if (diff < 0) trendIcon = '<i class="fas fa-arrow-down" style="color: var(--color-success)"></i>';

    return `
        <div class="rate-item anim">
            <div class="rate-info">
                <span class="rate-emoji">${product.emoji}</span>
                <div>
                    <div class="rate-name">${product.name}</div>
                    <div class="rate-unit">${product.unit}</div>
                </div>
            </div>
            <div class="rate-price text-right">
                <div class="price-value" style="color: var(--color-success); font-weight: 700;">${window.formatPrice(product.price)}</div>
                <div class="flex align-center justify-end gap-2" style="font-size: 0.85rem;">
                    <span class="rate-trend">${trendIcon}</span>
                    <span style="color: var(--color-text-muted); text-decoration: line-through; opacity: 0.7;">${window.formatPrice(product.previousPrice)}</span>
                </div>
            </div>
        </div>
    `;
};

window.buildStockBadge = (status) => {
    const config = {
        'in-stock': { class: 'in-stock', text: 'In Stock' },
        'low-stock': { class: 'low-stock', text: 'Low Stock' },
        'out-stock': { class: 'out-stock', text: 'Out of Stock' },
        'unknown': { class: 'unknown', text: 'Checking...' }
    };
    const s = config[status] || config['unknown'];
    return `<span class="stock-badge ${s.class}">${s.text}</span>`;
};

// --- 6. SCROLL & ANIMATIONS (Improved) ---
window.initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.anim').forEach(el => observer.observe(el));
};

window.initScrollTopBtn = () => {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// --- 7. INTERACTIVE UI ---
window.initTabs = (selector) => {
    const tabs = document.querySelectorAll(selector + ' .tab-btn');
    if (!tabs.length) return;

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            const parent = btn.closest('.page-tabs') || document;

            // Toggle buttons
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle panels
            parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const panel = parent.querySelector(`.tab-panel[data-tab="${tabId}"]`);
            if (panel) panel.classList.add('active');
        });
    });
};

window.initAccordion = () => {
    const btns = document.querySelectorAll('.accordion-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const body = btn.nextElementSibling;
            btn.classList.toggle('open');
            if (body) body.classList.toggle('open');
        });
    });
};

window.initStatCounters = () => {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 1800;
                let start = 0;
                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    el.textContent = Math.floor(progress * target).toLocaleString();
                    if (progress < 1) window.requestAnimationFrame(step);
                };
                window.requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    });

    stats.forEach(s => observer.observe(s));
};

window.setActiveNavLink = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
};

// --- 8. GLOBAL FIREBASE DATA LOADING ---
window.loadFirebaseData = async () => {
    try {
        if (typeof db === 'undefined') return;

        // Add a 5-second timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firebase timeout')), 5000)
        );

        const loadData = async () => {
            // Load Offers
            const offersSnap = await db.collection('offers').get();
            if (!offersSnap.empty) {
                window.WEEKLY_OFFERS = [];
                offersSnap.forEach(doc => window.WEEKLY_OFFERS.push({ id: doc.id, ...doc.data() }));
            }

            // Load Rates
            const ratesSnap = await db.collection('rates').get();
            if (!ratesSnap.empty) {
                window.PRODUCT_RATES = [];
                ratesSnap.forEach(doc => window.PRODUCT_RATES.push({ id: doc.id, ...doc.data() }));
            }

            // Load Stock
            const stockSnap = await db.collection('stock').get();
            if (!stockSnap.empty) {
                window.STOCK_STATUS = {};
                stockSnap.forEach(doc => {
                    const data = doc.data();
                    window.STOCK_STATUS[doc.id] = data.status || 'in-stock';
                });
            }
        };

        await Promise.race([loadData(), timeoutPromise]);
    } catch (e) {
        console.warn("Could not load fresh data from Firebase. Using local fallback.", e);
    }
};

// --- 9. GLOBAL INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get live data
    await window.loadFirebaseData();

    // 2. Initialize UI components that depend on data
    window.updateNavAuth();
    window.initBranchSelector();
    window.setActiveNavLink();
    window.initScrollAnimations();
    window.initScrollTopBtn();
    window.initRateCalc();
    window.initAccordion();
    window.initTabs('.page-tabs');
    window.initStatCounters();

    // 3. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // 4. Let specific pages know data is ready to be rendered
    document.dispatchEvent(new Event('firebaseDataLoaded'));
});

// Hide loader on load
window.addEventListener('load', function () {
    var loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s';
        setTimeout(function () { loader.style.display = 'none'; }, 400);
    }
});

// Safety fallback — force hide after 3 seconds no matter what
setTimeout(function () {
    var loader = document.getElementById('page-loader');
    if (loader) loader.style.display = 'none';
}, 3000);

// --- MALEE CHATBOT 2.0 (Sri Lankan Personality & Name Capture) ---
window.maleeUserName = localStorage.getItem('malee_user_name') || null;

window.toggleMalee = () => {
    const windowEl = document.getElementById('malee-window');
    if (windowEl) {
        const isOpening = windowEl.style.display !== 'flex';
        windowEl.style.display = isOpening ? 'flex' : 'none';

        if (isOpening) {
            document.getElementById('malee-input').focus();

            // Initial greeting if empty
            const messages = document.getElementById('malee-messages');
            if (messages.children.length <= 1) { // Only default message exists
                const user = window.getUser();
                if (user && user.name) {
                    window.maleeUserName = user.name.split(' ')[0];
                    window.addChatMessage(`Ayubowan ${window.maleeUserName}! 🙏 I see you're logged in. How can I help you today?`, 'bot');
                } else if (!window.maleeUserName) {
                    window.addChatMessage("Ayubowan! 🙏 I'm Malee. Before we start, what's your name, machan?", 'bot');
                } else {
                    window.addChatMessage(`Ayubowan ${window.maleeUserName}! 🙏 Nice to see you again. What can I help you with today?`, 'bot');
                }
            }
        }
    }
};

window.sendMaleeMessage = (quickMessage) => {
    const input = document.getElementById('malee-input');
    const msg = quickMessage || input.value.trim();
    if (!msg) return;

    window.addChatMessage(msg, 'user');
    if (!quickMessage) input.value = '';

    setTimeout(() => {
        const low = msg.toLowerCase();
        let response = "";

        // 1. Name Capture Logic
        if (!window.maleeUserName && !window.getUser()) {
            window.maleeUserName = msg.split(' ').pop(); // Take last word as name or just the string
            localStorage.setItem('malee_user_name', window.maleeUserName);
            response = `Nice to meet you, ${window.maleeUserName}! 🙏 How can I help you with your shopping today?`;
            window.addChatMessage(response, 'bot');
            return;
        }

        const name = window.maleeUserName || (window.getUser() ? window.getUser().name.split(' ')[0] : "machan");

        // 2. Response Logic with Personality
        if (low.includes('branch') || low.includes('where') || low.includes('location')) {
            response = `Listen ${name}, we have 6 branches! 🏪 Akurana 7MP, Akurana 6MP, Katugastota, Warakamura, Mallawapitiya, and Wattala. Wattala is our newest gem! ✨`;
        } else if (low.includes('offer') || low.includes('discount') || low.includes('deal') || low.includes('promotion')) {
            response = `Aiyo ${name}, you want deals? 🌶️ Our weekly offers are top class! Check the 'Hot Offers' section on the homepage or our Weekly Offers page.`;
        } else if (low.includes('point') || low.includes('loyalty') || low.includes('card')) {
            response = `Our Loyalty Card is a winner, ${name}! 💳 1 point for every Rs. 100. Register at any counter with just your phone number. Very simple!`;
        } else if (low.includes('hello') || low.includes('hi') || low.includes('hey') || low.includes('ayubowan')) {
            response = `Ayubowan ${name}! 🙏 Hope you're having a great day. What's on your mind?`;
        } else if (low.includes('price') || low.includes('rate')) {
            response = `Rates are changing daily, ${name}. 📉 Check our 'Today's Rates' page for the most accurate prices on veg and essentials.`;
        } else if (low.includes('wattala')) {
            response = `Wattala branch is open and looking beautiful! 🎉 Go check it out, ${name}. Exclusive offers are waiting for you there.`;
        } else if (low.includes('bye') || low.includes('thank')) {
            response = `Bohoma sthuthi, ${name}! 🙏 Take care and come back soon. Happy shopping! 👋`;
        } else {
            response = `Interesting point, ${name}. 🧐 I'm still learning, but I can tell you all about our branches, points, and offers if you ask!`;
        }

        window.addChatMessage(response, 'bot');
    }, 800);
};

window.addChatMessage = (text, sender) => {
    const container = document.getElementById('malee-messages');
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg ' + sender;
    msgEl.textContent = text;
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
};

// --- HERO OFFERS ROTATOR ---
window.initHeroRotator = () => {
    const rotatorBtn = document.getElementById('hero-offer-rotator');
    if (!rotatorBtn) return;

    let offers = [];
    if (window.WEEKLY_OFFERS) offers = window.WEEKLY_OFFERS.slice(0, 5); // Top 5 for hero
    if (!offers.length) return;

    let currentIndex = 0;

    const renderHeroCard = (offer) => {
        rotatorBtn.innerHTML = window.buildOfferCard(offer);
        rotatorBtn.style.transform = 'rotate(3deg) scale(1.05)';
        setTimeout(() => {
            rotatorBtn.style.transform = 'rotate(3deg) scale(1)';
        }, 300);
    };

    renderHeroCard(offers[currentIndex]);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % offers.length;
        renderHeroCard(offers[currentIndex]);
    }, 4000);
};

// --- HOT OFFERS GRID ---
window.initHotOffers = () => {
    const slider = document.getElementById('hot-offers-slider');
    if (!slider) return;

    let offers = [];
    if (window.getHotOffers) offers = window.getHotOffers();
    if (!offers.length && window.WEEKLY_OFFERS) offers = window.WEEKLY_OFFERS;

    // Output up to 8 items
    offers = offers.slice(0, 8);

    if (!offers.length) {
        slider.innerHTML = '<p class="text-center w-full" style="padding:40px;">Stay tuned! Hot offers dropping soon.</p>';
        return;
    }

    slider.innerHTML = offers.map(o => window.buildOfferCard(o, false, true)).join('');

    window.initScrollAnimations();
};

// --- HEADER SCROLL & TOGGLE ---
window.initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    const toggleBtn = document.getElementById('header-toggle');
    if (!header || !toggleBtn) return;

    let lastScrollY = window.scrollY;
    let isHidden = false;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Hide/Show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            if (!isHidden) {
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
                toggleBtn.style.display = 'flex';
                isHidden = true;
            }
        } else {
            if (isHidden) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                toggleBtn.style.display = 'none';
                isHidden = false;
            }
        }
        lastScrollY = currentScrollY;
    });

    toggleBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Header will naturally reappear as we scroll up
    });
};

document.addEventListener('DOMContentLoaded', () => {
    window.initHeaderScroll();
    window.initBranchSelector();
    window.initHotOffers();
    // Use timeout to ensure Firebase data logic has time if it's slow
    setTimeout(() => {
        if (!window.currentUserDoc) window.updateNavAuth();
    }, 500);
});

document.addEventListener('firebaseDataLoaded', () => {
    window.initHeroRotator();
    window.initHotOffers();
});

// end of main.js
