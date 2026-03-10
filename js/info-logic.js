/**
 * Multi Super - Information Site Logic
 * Handles calculators, stock checkers, and interactive UI elements
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Essential Rates Calculator (rates.html) ---
    const calcForm = document.getElementById('rates-calc-form');
    if (calcForm) {
        const itemSelect = document.getElementById('calc-item');
        const qtyInput = document.getElementById('calc-qty');
        const totalDisplay = document.getElementById('calc-total');

        // Populate items from data if select is empty (or just handle logic)
        const updateCalc = () => {
            const selectedId = itemSelect.value;
            const qty = parseFloat(qtyInput.value) || 0;
            const rateObj = ESSENTIAL_RATES.find(r => r.id === selectedId);

            if (rateObj) {
                const total = rateObj.price * qty;
                totalDisplay.textContent = `Rs. ${total.toLocaleString()}`;
            }
        };

        itemSelect.addEventListener('change', updateCalc);
        qtyInput.addEventListener('input', updateCalc);
    }

    // --- 2. Loyalty Points Simulator (loyalty.html) ---
    const pointsBtn = document.getElementById('check-points-btn');
    if (pointsBtn) {
        pointsBtn.addEventListener('click', () => {
            const cardId = document.getElementById('loyalty-card-id').value;
            if (!cardId) return alert('Please enter your card number');

            // Simulating a lookup
            const btn = pointsBtn;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Card ${cardId} has 1,240 points available! \nGold Tier Status Active.`);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    // --- 3. Shareable Logic: Scroll Visuals & Branch Selectors ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    // Simple Branch Selector Toggle
    const branchSelector = document.querySelector('.branch-selector');
    if (branchSelector) {
        branchSelector.addEventListener('click', () => {
            const branches = ['Akurana Main', 'Kandy City', 'Matale'];
            const current = document.getElementById('current-branch').textContent;
            const nextIdx = (branches.indexOf(current) + 1) % branches.length;
            document.getElementById('current-branch').textContent = branches[nextIdx];

            // Notify site (could trigger stock updates if needed)
            console.log(`Branch switched to: ${branches[nextIdx]}`);
        });
    }

    // --- 4. Contact Form Simulation ---
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact')) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerHTML = '<i class="fas fa-paper-plane fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! Our team will get back to you within 24 hours.');
                contactForm.reset();
                btn.innerHTML = 'Send Message';
                btn.disabled = false;
            }, 1500);
        });
    }
});
