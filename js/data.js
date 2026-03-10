/**
 * Multi Super - Part 2: Data Layer
 * Comprehensive mock data and access helpers
 */

// --- 1. BRANCHES DATA ---
window.BRANCHES = [
    {
        id: 'akurana-7mp',
        name: 'Akurana 7MP',
        isMain: true,
        address: '200, Matale Road, Akurana, Kandy 20850',
        phone: '081 230 4455',
        email: 'akurana@multisuper.lk',
        coordinates: { lat: 7.3607, lng: 80.6187 },
        hours: {
            weekday: '7:30 AM – 9:30 PM',
            saturday: '7:30 AM – 9:30 PM',
            sunday: '7:30 AM – 9:30 PM'
        },
        services: ['Fresh Bakery', 'Butcher Counter', 'ATM', 'Free Parking']
    },
    {
        id: 'akurana-6mp',
        name: 'Akurana 6MP',
        isMain: false,
        address: '197, Kurundugahawela, Matale Road, Akurana',
        phone: '081 230 4456',
        email: 'akurana6@multisuper.lk',
        coordinates: { lat: 7.3590, lng: 80.6175 },
        hours: {
            weekday: '7:30 AM – 9:30 PM',
            saturday: '7:30 AM – 9:30 PM',
            sunday: '7:30 AM – 9:30 PM'
        },
        services: ['Fresh Bakery', 'Pharmacy Counter', 'Free Parking']
    },
    {
        id: 'katugastota',
        name: 'Katugastota',
        isMain: false,
        address: '161/A, Madawala Road, Katugastota, Kandy',
        phone: '081 230 4457',
        email: 'katugastota@multisuper.lk',
        coordinates: { lat: 7.3271, lng: 80.6357 },
        hours: {
            weekday: '8:00 AM – 9:30 PM',
            saturday: '8:00 AM – 9:30 PM',
            sunday: '8:00 AM – 9:30 PM'
        },
        services: ['Butcher Counter', 'Free Parking', 'Fresh Produce']
    },
    {
        id: 'warakamura',
        name: 'Warakamura',
        isMain: false,
        address: 'Warakamura, Kandy District',
        phone: '081 230 4458',
        email: 'warakamura@multisuper.lk',
        coordinates: { lat: 7.3450, lng: 80.6820 },
        hours: {
            weekday: '8:00 AM – 9:00 PM',
            saturday: '8:00 AM – 9:00 PM',
            sunday: '8:00 AM – 9:00 PM'
        },
        services: ['Fresh Produce', 'Free Parking']
    },
    {
        id: 'mallawapitiya',
        name: 'Mallawapitiya',
        isMain: false,
        address: 'Mallawapitiya, Kurunegala District',
        phone: '037 230 4459',
        email: 'mallawapitiya@multisuper.lk',
        coordinates: { lat: 7.4820, lng: 80.5340 },
        hours: {
            weekday: '8:00 AM – 9:00 PM',
            saturday: '8:00 AM – 9:00 PM',
            sunday: '8:00 AM – 9:00 PM'
        },
        services: ['Fresh Produce', 'Bakery', 'Free Parking']
    },
    {
        id: 'wattala',
        name: 'Wattala',
        isMain: false,
        address: '34, Negombo Road, Wattala 11300',
        phone: '011 230 4460',
        email: 'wattala@multisuper.lk',
        coordinates: { lat: 6.9897, lng: 79.8921 },
        hours: {
            weekday: '8:00 AM – 10:00 PM',
            saturday: '8:00 AM – 10:00 PM',
            sunday: '8:00 AM – 10:00 PM'
        },
        services: ['ATM', 'Pharmacy Counter', 'Free Parking', 'Fresh Bakery']
    }
];

// --- 2. WEEKLY OFFERS ---
const today = new Date();
const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
const dateFrom = startOfWeek.toLocaleDateString('en-GB');
const dateTo = endOfWeek.toLocaleDateString('en-GB');

window.WEEKLY_OFFERS = [
    // Fresh Produce (4)
    { id: "off-001", title: "Local Red Onions", description: "Fresh farm picks", category: "Fresh Produce", originalPrice: 650, offerPrice: 480, discount: 26, unit: "1kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: true },
    { id: "off-002", title: "Fresh Carrots", description: "Nuwara Eliya premium", category: "Fresh Produce", originalPrice: 380, offerPrice: 295, discount: 22, unit: "500g", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "wattala"], isHot: false },
    { id: "off-003", title: "Cavendish Bananas", description: "Ripe and sweet", category: "Fresh Produce", originalPrice: 280, offerPrice: 220, discount: 21, unit: "1kg", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "mallawapitiya"], isHot: false },
    { id: "off-004", title: "Big Potatoes", description: "Imported Grade A", category: "Fresh Produce", originalPrice: 450, offerPrice: 360, discount: 20, unit: "1kg", image: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["katugastota", "wattala"], isHot: true },

    // Meat & Fish (2)
    { id: "off-005", title: "Fresh Chicken Whole", description: "Skinless", category: "Meat & Fish", originalPrice: 1450, offerPrice: 1280, discount: 12, unit: "1kg", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "wattala"], isHot: true },
    { id: "off-006", title: "Thalapath Fish Steak", description: "Fresh catch", category: "Meat & Fish", originalPrice: 2200, offerPrice: 1850, discount: 16, unit: "1kg", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["katugastota", "wattala"], isHot: false },

    // Dairy (2)
    { id: "off-007", title: "Highland Set Curd", description: "Traditional clay pot", category: "Dairy", originalPrice: 480, offerPrice: 395, discount: 18, unit: "1L", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: false },
    { id: "off-008", title: "Pasteurized Milk", description: "Kotmale Full Cream", category: "Dairy", originalPrice: 550, offerPrice: 490, discount: 11, unit: "1L", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "wattala"], isHot: false },

    // Rice & Grains (2)
    { id: "off-009", title: "Keeri Samba Rice", description: "Super Police Grade", category: "Rice & Grains", originalPrice: 2850, offerPrice: 2450, discount: 14, unit: "5kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: true },
    { id: "off-010", title: "Red Raw Rice", description: "Farm fresh", category: "Rice & Grains", originalPrice: 1050, offerPrice: 920, discount: 12, unit: "5kg", image: "https://images.unsplash.com/photo-1591814448473-16474c399e8c?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["mallawapitiya", "wattala"], isHot: false },

    // Beverages (2)
    { id: "off-011", title: "Ceylon Tea Packs", description: "Strong Leaf", category: "Beverages", originalPrice: 1250, offerPrice: 990, discount: 21, unit: "400g", image: "https://images.unsplash.com/photo-1544787210-2211d4304851?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: false },
    { id: "off-012", title: "Fruit Nectar", description: "Mango & Mixed Fruit", category: "Beverages", originalPrice: 680, offerPrice: 550, discount: 19, unit: "1L", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["katugastota", "wattala"], isHot: false },

    // Household (2)
    { id: "off-013", title: "Liquid Detergent", description: "Sunlight Care", category: "Household", originalPrice: 850, offerPrice: 690, discount: 19, unit: "1L", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: false },
    { id: "off-014", title: "Dishwash Liquid", description: "Vim Lemon", category: "Household", originalPrice: 450, offerPrice: 380, discount: 15, unit: "500ml", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "mallawapitiya"], isHot: false },

    // Personal Care (2)
    { id: "off-015", title: "Herbal Shampoo", description: "Kumarika Hair Fall Control", category: "Personal Care", originalPrice: 750, offerPrice: 590, discount: 21, unit: "180ml", image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "mallawapitiya", "wattala"], isHot: false },
    { id: "off-016", title: "Bathing Soap", description: "Baby Cheramy", category: "Personal Care", originalPrice: 150, offerPrice: 125, discount: 17, unit: "100g", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["katugastota", "wattala"], isHot: false },

    // New Offers (4)
    { id: "off-017", title: "Lemon Puff", description: "Maliban", category: "Bakery", originalPrice: 220, offerPrice: 190, discount: 14, unit: "200g", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "wattala", "katugastota"], isHot: true },
    { id: "off-018", title: "Vanilla Ice Cream", description: "Elephant House", category: "Frozen", originalPrice: 850, offerPrice: 720, discount: 15, unit: "1L", image: "https://images.unsplash.com/photo-1501443762994-82bd5dabb89a?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "wattala", "akurana-6mp"], isHot: false },
    { id: "off-019", title: "Sliced Sandwich Bread", description: "Fresh Daily", category: "Bakery", originalPrice: 180, offerPrice: 150, discount: 17, unit: "400g", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["akurana-7mp", "katugastota", "wattala"], isHot: false },
    { id: "off-020", title: "Roma Tomatoes", description: "Farm Fresh", category: "Fresh Produce", originalPrice: 420, offerPrice: 350, discount: 17, unit: "1kg", image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80", validFrom: dateFrom, validTo: dateTo, branches: ["wattala", "mallawapitiya"], isHot: true }
];

// --- 3. PRODUCT RATES (Price Tracker) ---
window.PRODUCT_RATES = [
    { id: 'sugar-w', name: 'White Sugar', unit: '1kg', price: 275.00, previousPrice: 285.00, emoji: '🍚', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80', category: 'Food Cupboard', hue: 200 },
    { id: 'sugar-b', name: 'Brown Sugar', unit: '1kg', price: 340.00, previousPrice: 350.00, emoji: '🤎', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80', category: 'Food Cupboard', hue: 35 },
    { id: 'rice-n', name: 'Nadu Rice', unit: '1kg', price: 220.00, previousPrice: 215.00, emoji: '🌾', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', category: 'Rice & Grains', hue: 45 },
    { id: 'rice-s', name: 'Samba Rice', unit: '1kg', price: 245.00, previousPrice: 240.00, emoji: '🍚', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', category: 'Rice & Grains', hue: 50 },
    { id: 'rice-k', name: 'Keeri Samba', unit: '1kg', price: 290.00, previousPrice: 310.00, emoji: '🍚', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', category: 'Rice & Grains', hue: 55 },
    { id: 'flour-w', name: 'Wheat Flour', unit: '1kg', price: 195.00, previousPrice: 210.00, emoji: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', category: 'Food Cupboard', hue: 40 },
    { id: 'eggs-w', name: 'White Eggs', unit: '1pc', price: 42.00, previousPrice: 48.00, emoji: '🥚', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80', category: 'Fresh Produce', hue: 0 },
    { id: 'chicken-w', name: 'Whole Chicken', unit: '1kg', price: 1150.00, previousPrice: 1250.00, emoji: '🍗', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80', category: 'Meat & Fish', hue: 15 },
    { id: 'dhal-m', name: 'Mysore Dhal', unit: '1kg', price: 310.00, previousPrice: 325.00, emoji: '🥣', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?w=400&q=80', category: 'Food Cupboard', hue: 25 },
    { id: 'onion-r', name: 'Red Onion', unit: '1kg', price: 480.00, previousPrice: 520.00, emoji: '🧅', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80', category: 'Fresh Produce', hue: 340 },
    { id: 'onion-b', name: 'Big Onion', unit: '1kg', price: 310.00, previousPrice: 350.00, emoji: '🧅', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80', category: 'Fresh Produce', hue: 30 },
    { id: 'potato-l', name: 'Local Potato', unit: '1kg', price: 340.00, previousPrice: 380.00, emoji: '🥔', image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?w=400&q=80', category: 'Fresh Produce', hue: 40 },
    { id: 'milk-p', name: 'Milk Powder', unit: '400g', price: 1050.00, previousPrice: 1050.00, emoji: '🥛', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', category: 'Dairy & Chilled', hue: 200 },
    { id: 'tea-l', name: 'Tea Leaves', unit: '100g', price: 280.00, previousPrice: 290.00, emoji: '☕', image: 'https://images.unsplash.com/photo-1544787210-2211d4304851?w=400&q=80', category: 'Beverages', hue: 120 },
    { id: 'coconut', name: 'Fresh Coconut', unit: '1pc', price: 110.00, previousPrice: 130.00, emoji: '🥥', image: 'https://images.unsplash.com/photo-1558961363-fa4f2323a22d?w=400&q=80', category: 'Fresh Produce', hue: 90 },
    { id: 'green-chili', name: 'Green Chili', unit: '100g', price: 85.00, previousPrice: 120.00, emoji: '🌶️', image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80', category: 'Fresh Produce', hue: 120 }
];

// --- 4. STOCK STATUS ---
window.STOCK_STATUS = {};

// Helper to fill stock variation
const populateStock = () => {
    const branches = ["akurana-7mp", "akurana-6mp", "katugastota", "warakamura", "mallawapitiya", "wattala"];
    const products = window.PRODUCT_RATES.map(p => p.name);

    branches.forEach(branch => {
        products.forEach(product => {
            const rand = Math.random();
            let status = "in-stock";
            if (rand < 0.1) status = "out-stock";
            else if (rand < 0.25) status = "low-stock";

            window.STOCK_STATUS[`${branch}-${product}`] = status;
        });
    });
};
populateStock();

// --- 5. LOYALTY MOCK DATA ---
window.LOYALTY_MOCK = [
    {
        phone: "0771234567",
        name: "Ashfaq Jareed",
        memberSince: "Jan 2023",
        tier: "Gold",
        points: 4250,
        pointsToNext: 750,
        totalSpent: 124500,
        cardNumber: "4567 8901 **** 4567",
        recentTransactions: [
            { date: "2024-03-01", description: "Weekly Grocery Shopping", branch: "Akurana", pointsEarned: 120, pointsSpent: 0, balance: 4250 },
            { date: "2024-02-24", description: "Vegetables & Bakery", branch: "Akurana", pointsEarned: 45, pointsSpent: 0, balance: 4130 },
            { date: "2024-02-15", description: "Monthly Household Supplies", branch: "Kandy", pointsEarned: 350, pointsSpent: 500, balance: 4085 },
            { date: "2024-02-08", description: "Points Redemption", branch: "Akurana", pointsEarned: 0, pointsSpent: 1000, balance: 4235 },
            { date: "2024-02-01", description: "Fresh Produce", branch: "Matale", pointsEarned: 80, pointsSpent: 0, balance: 5235 },
            { date: "2024-01-25", description: "Bakery & Meat", branch: "Akurana", pointsEarned: 110, pointsSpent: 0, balance: 5155 },
            { date: "2024-01-18", description: "Beverages", branch: "Kandy", pointsEarned: 60, pointsSpent: 0, balance: 5045 },
            { date: "2024-01-11", description: "Personal Care", branch: "Akurana", pointsEarned: 95, pointsSpent: 0, balance: 4985 }
        ]
    },
    {
        phone: "0711223344",
        name: "Samantha Perera",
        memberSince: "May 2024",
        tier: "Silver",
        points: 850,
        pointsToNext: 150,
        totalSpent: 45000,
        cardNumber: "4567 1122 **** 8899",
        recentTransactions: [
            { date: "2024-03-05", description: "Office Supplies", branch: "Kandy", pointsEarned: 50, pointsSpent: 0, balance: 850 },
            { date: "2024-02-28", description: "Daily Essentials", branch: "Wattala", pointsEarned: 30, pointsSpent: 0, balance: 800 },
            { date: "2024-02-20", description: "Gift Shopping", branch: "Kandy", pointsEarned: 120, pointsSpent: 0, balance: 770 },
            { date: "2024-02-12", description: "Snacks & Drinks", branch: "Kandy", pointsEarned: 40, pointsSpent: 0, balance: 650 },
            { date: "2024-02-05", description: "Groceries", branch: "Wattala", pointsEarned: 90, pointsSpent: 0, balance: 610 },
            { date: "2024-01-29", description: "Breakfast Items", branch: "Kandy", pointsEarned: 25, pointsSpent: 0, balance: 520 },
            { date: "2024-01-20", description: "Fruits", branch: "Kandy", pointsEarned: 15, pointsSpent: 0, balance: 495 },
            { date: "2024-01-12", description: "Fresh Vegetables", branch: "Kandy", pointsEarned: 20, pointsSpent: 0, balance: 480 }
        ]
    }
];

// --- 6. PAMPHLET SUBSCRIBERS ---
window.PAMPHLET_SUBSCRIBERS = [];

// --- 7. HELPER FUNCTIONS ---
window.getOffersByBranch = (branchId) => {
    return window.WEEKLY_OFFERS.filter(offer => offer.branches.includes(branchId));
};

window.getOffersByCategory = (cat) => {
    return window.WEEKLY_OFFERS.filter(offer => offer.category === cat);
};

window.getHotOffers = () => {
    return window.WEEKLY_OFFERS.filter(offer => offer.isHot === true);
};

window.getRateByName = (name) => {
    return window.PRODUCT_RATES.find(product => product.name === name);
};

window.getStockStatus = (branchId, productName) => {
    return window.STOCK_STATUS[`${branchId}-${productName}`] || "unknown";
};

window.getUserByPhone = (phone) => {
    return window.LOYALTY_MOCK.find(user => user.phone === phone);
};

window.getBranchById = function (id) {
    return window.BRANCHES.find(function (b) { return b.id === id; }) || window.BRANCHES[0];
};
