/**
 * Multi Super | Products Data Layer
 * Contains all product information and helper functions
 */

const PRODUCTS = [
    // --- FRESH PRODUCE ---
    {
        id: "p1",
        name: "Fresh Big Onion (1kg)",
        category: "Produce",
        price: 320.00,
        originalPrice: 380.00,
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Freshly sourced high-quality big onions. Perfect for Sri Lankan curries."
    },
    {
        id: "p2",
        name: "Red Tomato (500g)",
        category: "Produce",
        price: 180.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1546470427-e26264ee0b1e?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Farm-fresh ripe red tomatoes. Rich in vitamins and lycopene."
    },
    {
        id: "p3",
        name: "Green Chilies (100g)",
        category: "Produce",
        price: 65.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Spicy and fresh local green chilies."
    },
    {
        id: "p4",
        name: "Carrot (500g)",
        category: "Produce",
        price: 240.00,
        originalPrice: 280.00,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City"],
        isDeal: true,
        description: "Sweet and crunchy local carrots."
    },
    {
        id: "p5",
        name: "Leeks (500g)",
        category: "Produce",
        price: 210.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Freshly harvested leeks from Upcountry farms."
    },

    // --- DAIRY & CHILLED ---
    {
        id: "p6",
        name: "Anchor Full Cream Milk (1L)",
        category: "Dairy",
        price: 1250.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1550583724-1255818c0533?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Pure and creamy full cream milk powder for your daily needs."
    },
    {
        id: "p7",
        name: "Highland Butter (200g)",
        category: "Dairy",
        price: 850.00,
        originalPrice: 920.00,
        image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Kandy City", "Matale"],
        isDeal: true,
        description: "Rich and creamy butter made from fresh Highland milk."
    },
    {
        id: "p8",
        name: "Kotmale Set Yoghurt (80g)",
        category: "Dairy",
        price: 90.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1571212515416-fef81f4227c3?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Delicious and healthy set yoghurt."
    },
    {
        id: "p9",
        name: "Cheese Slices (10pk)",
        category: "Dairy",
        price: 1100.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-152828905328a-d23a7267f578?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Kandy City"],
        isDeal: false,
        description: "Processed cheese slices, perfect for sandwiches."
    },

    // --- MEAT & SEAFOOD ---
    {
        id: "p10",
        name: "Chicken Drumstick (1kg)",
        category: "Meat",
        price: 1650.00,
        originalPrice: 1800.00,
        image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Freshly chilled chicken drumsticks. High protein source."
    },
    {
        id: "p11",
        name: "Beef Lean (500g)",
        category: "Meat",
        price: 1800.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main"],
        isDeal: false,
        description: "Fresh and tender beef cuts. Sourced locally."
    },
    {
        id: "p12",
        name: "Fresh Thalapath (500g)",
        category: "Seafood",
        price: 1450.00,
        originalPrice: 1600.00,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Fresh sailfish (Thalapath) steaks. Cleaned and ready to cook."
    },

    // --- BAKERY & SNACKS ---
    {
        id: "p13",
        name: "White Bread (400g)",
        category: "Bakery",
        price: 190.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Freshly baked soft white bread loaf."
    },
    {
        id: "p14",
        name: "Munchee Super Cream Cracker",
        category: "Snacks",
        price: 240.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1590080876351-941f369ee625?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "The classic Sri Lankan companion for tea."
    },
    {
        id: "p15",
        name: "Maliban Lemon Puff (200g)",
        category: "Snacks",
        price: 220.00,
        originalPrice: 250.00,
        image: "https://images.unsplash.com/photo-1558961778-303a886d5741?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Crispy biscuits with a tangy lemon cream filling."
    },

    // --- GROCERIES ---
    {
        id: "p16",
        name: "Keeri Samba Rice (5kg)",
        category: "Grains",
        price: 1450.00,
        originalPrice: 1550.00,
        image: "https://images.unsplash.com/photo-1586201375761-83863717df30?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Premium quality Keeri Samba rice. Polished and stones removed."
    },
    {
        id: "p17",
        name: "White Sugar (1kg)",
        category: "Groceries",
        price: 280.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Fine white granulated sugar."
    },
    {
        id: "p18",
        name: "Watawala Tea (400g)",
        category: "Beverages",
        price: 880.00,
        originalPrice: 950.00,
        image: "https://images.unsplash.com/photo-1544787210-2211d40fd864?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Rich Sri Lankan blend of strong black tea."
    },
    {
        id: "p19",
        name: "Maggi Noodles (75g x 5)",
        category: "Groceries",
        price: 650.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Quick and easy chicken flavored noodles."
    },
    {
        id: "p20",
        name: "Fortune Coconut Oil (1L)",
        category: "Groceries",
        price: 920.00,
        originalPrice: 1050.00,
        image: "https://images.unsplash.com/photo-1595434066347-160867866346?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "100% pure edible coconut oil for healthy cooking."
    },

    // --- BEVERAGES ---
    {
        id: "p21",
        name: "Coca-Cola (1.5L)",
        category: "Beverages",
        price: 450.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Refreshing sparkling soft drink."
    },
    {
        id: "p22",
        name: "Elephant House Cream Soda (1.5L)",
        category: "Beverages",
        price: 380.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Classic Sri Lankan cream soda flavor."
    },
    {
        id: "p23",
        name: "Milo Powder (400g)",
        category: "Beverages",
        price: 1100.00,
        originalPrice: 1250.00,
        image: "https://images.unsplash.com/photo-1544787210-2211d40fd864?auto=format&fit=crop&q=80&w=400", // placeholder
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Malt extract drink powder for energy and growth."
    },

    // --- HOUSEHOLD & CARE ---
    {
        id: "p24",
        name: "Lifebuoy Total 10 Soap (100g)",
        category: "Personal Care",
        price: 160.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Advanced germ protection bar soap."
    },
    {
        id: "p25",
        name: "Signal Toothpaste (120g)",
        category: "Personal Care",
        price: 340.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1559594864-4ef30df80b44?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Stronger teeth and fresh breath for the whole family."
    },
    {
        id: "p26",
        name: "Surf Excel Washing Powder (500g)",
        category: "Household",
        price: 480.00,
        originalPrice: 550.00,
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc61a5e8c?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: true,
        description: "Tough stain removal in one wash."
    },
    {
        id: "p27",
        name: "Harpic Bathroom Cleaner (500ml)",
        category: "Household",
        price: 720.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400",
        inStock: true,
        branches: ["Akurana Main", "Kandy City", "Matale"],
        isDeal: false,
        description: "Kills 99.9% of germs for a fresh and clean bathroom."
    },

    // --- MORE PRODUCTS TO TOTAL 40+ ---
    { id: "p28", name: "Red Lentils (1kg)", category: "Groceries", price: 340.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1585992227181-4200c8723220?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Quality red lentils for daily cooking." },
    { id: "p29", name: "Canned Fish (425g)", category: "Groceries", price: 680.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1622321481845-81284d79ce9f?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Sardines in tomato sauce." },
    { id: "p30", name: "Potato (1kg)", category: "Produce", price: 290.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Fresh local potatoes." },
    { id: "p31", name: "Papaya Fresh", category: "Produce", price: 450.00, originalPrice: 520.00, inStock: true, image: "https://images.unsplash.com/photo-1517282001929-f83f14bc9eb3?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City"], isDeal: true, description: "Sweet and ripe local papaya." },
    { id: "p32", name: "Banana Seeni (1kg)", category: "Produce", price: 380.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1571771894821-ad99026.f?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Sri Lankan sweet banana variety." },
    { id: "p33", name: "Kiri Toffee (200g)", category: "Bakery", price: 650.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1582231946856-35327ea1e33c?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Matale"], isDeal: false, description: "Traditional Sri Lankan milk toffee." },
    { id: "p34", name: "MD Tomato Sauce (400g)", category: "Groceries", price: 420.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1605663738536-ea38a6a237eb?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Pure tomato ketchup." },
    { id: "p35", name: "Knorr Chicken Cubes (6pk)", category: "Groceries", price: 240.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1601050634129-4114444530af?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Flavor enhancer for curries." },
    { id: "p36", name: "7-Up (1.5L)", category: "Beverages", price: 430.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Lemon-lime flavored soft drink." },
    { id: "p37", name: "Baby Cheramy Soap (75g)", category: "Personal Care", price: 145.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1602161280385-d72babc98421?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Mild and gentle soap for babies." },
    { id: "p38", name: "Vim Dishwash Liquid (500ml)", category: "Household", price: 390.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Cuts through grease effectively." },
    { id: "p39", name: "Dettol Antiseptic (500ml)", category: "Household", price: 1250.00, originalPrice: 1400.00, inStock: true, image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: true, description: "Proven protection against germs." },
    { id: "p40", name: "Maliban Mari Gold (80g)", category: "Snacks", price: 110.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1590080876351-941f369ee625?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "Tasty snack for all ages." },
    { id: "p41", name: "Sunlight Soap (120g)", category: "Household", price: 120.00, originalPrice: null, inStock: true, image: "https://images.unsplash.com/photo-1626806820542-a4f6470eb063?auto=format&fit=crop&q=80&w=400", branches: ["Akurana Main", "Kandy City", "Matale"], isDeal: false, description: "The classic laundry and household soap." }
];

const CATEGORIES = [
    { name: "Produce", icon: "🥬" },
    { name: "Dairy", icon: "🥛" },
    { name: "Meat", icon: "🥩" },
    { name: "Seafood", icon: "🐟" },
    { name: "Bakery", icon: "🍞" },
    { name: "Snacks", icon: "🍪" },
    { name: "Groceries", icon: "🍛" },
    { name: "Beverages", icon: "🥤" },
    { name: "Personal Care", icon: "🧼" },
    { name: "Household", icon: "🧹" }
];

const BRANCHES = [
    { id: "b1", name: "Akurana Main", address: "85, Matale Road, Akurana", phone: "081 230 4455", hours: "7:00 AM - 10:00 PM" },
    { id: "b2", name: "Kandy City", address: "12, Dalada Vidiya, Kandy", phone: "081 222 3344", hours: "8:00 AM - 9:00 PM" },
    { id: "b3", name: "Matale", address: "150, Trincomalee Street, Matale", phone: "066 222 1122", hours: "7:30 AM - 9:30 PM" }
];

// --- Information Site Data ---

const ESSENTIAL_RATES = [
    { id: 'sugar', name: 'White Sugar', price: 275, unit: '1kg', change: -5, trend: 'down' },
    { id: 'rice', name: 'Samba Rice', price: 230, unit: '1kg', change: 10, trend: 'up' },
    { id: 'flour', name: 'Wheat Flour', price: 190, unit: '1kg', change: 0, trend: 'same' },
    { id: 'milk', name: 'Milk Powder', price: 1150, unit: '400g', change: -15, trend: 'down' },
    { id: 'lp-gas', name: 'LPG (Litro)', price: 3650, unit: '12.5kg', change: 120, trend: 'up' }
];

const LOYALTY_TIERS = [
    { name: 'Bronze', class: 'bronze', minPoints: 0, icon: '🥉' },
    { name: 'Silver', class: 'silver', minPoints: 1000, icon: '🥈' },
    { name: 'Gold', class: 'gold', minPoints: 5000, icon: '🥇' },
    { name: 'Platinum', class: 'platinum', minPoints: 15000, icon: '💎' }
];

const PROMOTIONS = [
    { id: 'p1', name: 'Weekend Veggie Rush', discount: '20%', category: 'Vegetables', expiry: '2026-03-08', emoji: '🥦' },
    { id: 'p2', name: 'Fresh Catch Friday', discount: '15%', category: 'Seafood', expiry: '2026-03-07', emoji: '🐟' },
    { id: 'p3', name: 'Beverage Bonanza', discount: '10%', category: 'Beverages', expiry: '2026-03-15', emoji: '🥤' }
];

/**
 * Format price to Sri Lankan Rupee format: Rs. 1,250.00
 * @param {number} price 
 * @returns {string}
 */
function formatPrice(price) {
    if (price === null || price === undefined) return "N/A";
    return "Rs. " + price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Get product by ID
 * @param {string} id 
 * @returns {object|null}
 */
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
}

/**
 * Get products by category
 * @param {string} category 
 * @returns {array}
 */
function getProductsByCategory(category) {
    if (!category || category === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

/**
 * Search products by name
 * @param {string} query 
 * @returns {array}
 */
function searchProducts(query) {
    if (!query) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
}
