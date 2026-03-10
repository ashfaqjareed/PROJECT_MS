/**
 * Multi Super - Firebase Seeding Utility
 * Use this to push mock data from js/data.js to your live Firestore database.
 */

window.seedDatabase = async () => {
    if (!confirm("This will overwrite/update data in your Firestore database using the local mock data. Continue?")) return;

    window.showToast("Starting database seed...", "info");

    try {
        const batch = db.batch();

        // 1. Seed Weekly Offers
        if (window.WEEKLY_OFFERS) {
            window.WEEKLY_OFFERS.forEach(offer => {
                const docRef = db.collection('offers').doc(offer.id);
                batch.set(docRef, offer);
            });
            console.log("Buffered Offers...");
        }

        // 2. Seed Product Rates
        if (window.PRODUCT_RATES) {
            window.PRODUCT_RATES.forEach(rate => {
                const docRef = db.collection('rates').doc(rate.name);
                batch.set(docRef, rate);
            });
            console.log("Buffered Rates...");
        }

        // 3. Seed Stock Status (Transforming the flat object to branch-based docs)
        const branchIds = ["akurana", "kandy", "matale", "wattala"];
        branchIds.forEach(branchId => {
            const branchStock = {};
            const products = window.PRODUCT_RATES.map(p => p.name);
            products.forEach(pName => {
                const status = window.STOCK_STATUS[`${branchId}-${pName}`];
                if (status) branchStock[pName] = { status };
            });

            const docRef = db.collection('stock').doc(branchId);
            batch.set(docRef, { products: branchStock });
        });
        console.log("Buffered Stock...");

        // 4. Seed Mock Customers
        if (window.LOYALTY_MOCK) {
            window.LOYALTY_MOCK.forEach(user => {
                const docRef = db.collection('customers').doc(user.phone);
                // In a real app, you'd also need to create Auth users with seed passwords
                batch.set(docRef, user);
            });
            console.log("Buffered Customers...");
        }

        await batch.commit();
        window.showToast("Database seeded successfully!", "success");
        console.log("Seed Complete!");

        // Refresh page to show live data
        setTimeout(() => location.reload(), 2000);

    } catch (error) {
        console.error("Seed failed:", error);
        window.showToast("Seed failed: " + error.message, "error");
    }
};
