// EcoFinds Application JavaScript - Updated for Indian Market - Fixed Navigation

class EcoFindsApp {
    constructor() {
        // Initialize application state
        this.currentUser = null;
        this.products = [];
        this.categories = [];
        this.users = [];
        this.achievements = [];
        this.ecoTips = [];
        this.cart = [];
        this.wishlist = [];
        this.purchases = [];
        this.userListings = [];
        this.currentPage = 'home';
        this.editingProduct = null;
        this.filteredProducts = [];
        this.carbonData = {};
        this.impactStats = {};
        
        // Load initial data immediately
        this.loadInitialData();
        
        // Initialize event listeners immediately
        this.initializeEventListeners();
        
        // Check for existing session immediately
        this.checkExistingSession();
        
        // Show home page immediately
        this.showPage('home');
        this.loadProducts();
    }

    loadInitialData() {
        // Load data with products that have proper matching images
        const data = {"users": [{"id": "1", "username": "arjun_eco", "email": "arjun@example.com", "password": "password123", "fullName": "Arjun Sharma", "bio": "Passionate about sustainable living and circular economy in India", "location": "Mumbai, Maharashtra", "ecoPoints": 450, "sustainabilityScore": 92, "profileImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", "achievements": ["Eco Warrior", "Circular Champion", "Green Guardian"], "totalListings": 12, "totalPurchases": 28, "carbonSaved": 156.7, "wasteReduced": 34.2, "moneySaved": 124680, "joinedDate": "2024-01-15"}, {"id": "2", "username": "priya_sustainable", "email": "priya@example.com", "password": "password123", "fullName": "Priya Patel", "bio": "Making India greener one purchase at a time", "location": "Bangalore, Karnataka", "ecoPoints": 680, "sustainabilityScore": 98, "profileImage": "https://images.unsplash.com/photo-1494790108755-2616b332e2b0?w=100&h=100&fit=crop&crop=face", "achievements": ["Eco Master", "Community Leader", "Carbon Warrior"], "totalListings": 18, "totalPurchases": 42, "carbonSaved": 243.1, "wasteReduced": 52.8, "moneySaved": 198456, "joinedDate": "2023-11-20"}], "products": [{"id": "1", "title": "Vintage Oak Dining Table", "description": "Beautiful handcrafted oak dining table from the 1960s. Seats 6 people comfortably. Perfect centerpiece for family dinners and sustainable living. Shows minimal wear with rich patina that adds character.", "category": "Furniture", "subcategory": "Tables", "condition": "good", "price": 24899, "originalPrice": 74699, "currency": "INR", "images": ["https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 95, "badges": ["Vintage", "Handcrafted", "Solid Wood"], "views": 234, "favorites": 45, "rating": 4.9, "reviewCount": 18, "carbonSaved": 45.6, "wasteReduced": 12.3, "location": "Bangalore, Karnataka", "createdAt": "2025-08-15"}, {"id": "2", "title": "iPhone 12 Pro - Refurbished", "description": "Fully refurbished iPhone 12 Pro in excellent condition. Includes original charger, box, and 6-month warranty. Perfect alternative to buying new with full functionality.", "category": "Electronics", "subcategory": "Phones", "condition": "like_new", "price": 45649, "originalPrice": 82999, "currency": "INR", "images": ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&sat=-30", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 88, "badges": ["Refurbished", "Certified", "Warranty"], "views": 189, "favorites": 67, "rating": 4.7, "reviewCount": 23, "carbonSaved": 23.4, "wasteReduced": 3.2, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-20"}, {"id": "3", "title": "Vintage Leather Jacket", "description": "Classic vintage leather jacket from the 80s. Genuine leather in excellent condition with original hardware. Perfect for sustainable fashion enthusiasts who appreciate quality craftsmanship.", "category": "Clothing", "subcategory": "Jackets", "condition": "like_new", "price": 10789, "originalPrice": 29050, "currency": "INR", "images": ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&sat=-20", "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 92, "badges": ["Vintage", "Genuine Leather", "80s Classic"], "views": 156, "favorites": 34, "rating": 4.8, "reviewCount": 12, "carbonSaved": 15.7, "wasteReduced": 4.1, "location": "Bangalore, Karnataka", "createdAt": "2025-08-25"}, {"id": "4", "title": "Photo album", "description": "A collection of our best moments captured forever", "category": "", "subcategory": "Storage", "condition": "good", "price": 1000, "originalPrice": 2000, "currency": "INR", "images": ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 87, "badges": ["Modern", "Adjustable", "Storage"], "views": 98, "favorites": 23, "rating": 4.6, "reviewCount": 8, "carbonSaved": 12.3, "wasteReduced": 6.7, "location": "Mumbai, Maharashtra", "createdAt": "2025-09-01"}, {"id": "5", "title": "MacBook Air 2020 M1", "description": "Apple MacBook Air M1 2020 in excellent condition. Perfect for students and professionals. Includes original charger, box, and documentation. Outstanding performance and battery life.", "category": "Electronics", "subcategory": "Laptops", "condition": "like_new", "price": 66399, "originalPrice": 107899, "currency": "INR", "images": ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&sat=-20", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 90, "badges": ["M1 Chip", "Complete Box", "Like New"], "views": 267, "favorites": 89, "rating": 4.9, "reviewCount": 31, "carbonSaved": 34.5, "wasteReduced": 5.4, "location": "Bangalore, Karnataka", "createdAt": "2025-09-02"}, {"id": "6", "title": "Designer Evening Dress", "description": "Elegant black evening dress by renowned designer. Size M (8-10). Perfect for special occasions and sustainable fashion. Dry cleaned and stored properly in smoke-free home.", "category": "Clothing", "subcategory": "Dresses", "condition": "like_new", "price": 16599, "originalPrice": 49799, "currency": "INR", "images": ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop&sat=-10", "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 94, "badges": ["Designer", "Elegant", "Special Occasion"], "views": 145, "favorites": 56, "rating": 4.8, "reviewCount": 15, "carbonSaved": 18.9, "wasteReduced": 2.8, "location": "Mumbai, Maharashtra", "createdAt": "2025-09-03"}, {"id": "7", "title": "Leather Recliner Chair", "description": "Comfortable brown leather recliner chair. Perfect for reading and relaxation. Shows minimal wear and remains very comfortable. Great addition to any living room.", "category": "Furniture", "subcategory": "Chairs", "condition": "good", "price": 20749, "originalPrice": 58099, "currency": "INR", "images": ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 89, "badges": ["Leather", "Comfortable", "Recliner"], "views": 178, "favorites": 42, "rating": 4.7, "reviewCount": 19, "carbonSaved": 28.4, "wasteReduced": 15.6, "location": "Bangalore, Karnataka", "createdAt": "2025-09-04"}, {"id": "8", "title": "Samsung 4K Smart TV 55\"", "description": "55-inch Samsung 4K Smart TV in excellent condition. Crystal clear picture quality with smart features. Includes remote and original packaging. Perfect for entertainment.", "category": "Electronics", "subcategory": "TVs", "condition": "like_new", "price": 33199, "originalPrice": 74699, "currency": "INR", "images": ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&sat=-20", "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 85, "badges": ["4K Ultra HD", "Smart TV", "55 Inch"], "views": 234, "favorites": 67, "rating": 4.6, "reviewCount": 22, "carbonSaved": 42.1, "wasteReduced": 8.9, "location": "Mumbai, Maharashtra", "createdAt": "2025-09-05"}, {"id": "9", "title": "Men's Formal Navy Suit", "description": "Professional navy blue suit in excellent condition. Size 42R. Perfect for business meetings and formal events. Includes jacket and trousers, professionally cleaned.", "category": "Clothing", "subcategory": "Suits", "condition": "like_new", "price": 13289, "originalPrice": 37350, "currency": "INR", "images": ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop&sat=-15", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 91, "badges": ["Professional", "Navy Blue", "Complete Set"], "views": 123, "favorites": 29, "rating": 4.5, "reviewCount": 11, "carbonSaved": 14.2, "wasteReduced": 3.7, "location": "Bangalore, Karnataka", "createdAt": "2025-09-06"}, {"id": "10", "title": "Trek Mountain Bike 21-Speed", "description": "Trek mountain bike in great condition. 21-speed with front suspension. Perfect for outdoor adventures and eco-friendly transportation. Recently serviced with new tires.", "category": "Sports", "subcategory": "Bicycles", "condition": "good", "price": 29049, "originalPrice": 66399, "currency": "INR", "images": ["https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1544191696-15693072e0b5?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 96, "badges": ["Trek Brand", "21-Speed", "Front Suspension"], "views": 187, "favorites": 52, "rating": 4.8, "reviewCount": 16, "carbonSaved": 67.8, "wasteReduced": 23.4, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-28"}, {"id": "11", "title": "Antique Wooden Bed Frame", "description": "Beautiful antique wooden bed frame, queen size. Solid wood construction with intricate carvings. A piece of history for your bedroom. Structurally sound and beautifully aged.", "category": "Furniture", "subcategory": "Beds", "condition": "good", "price": 16599, "originalPrice": 49799, "currency": "INR", "images": ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 93, "badges": ["Antique", "Solid Wood", "Queen Size"], "views": 156, "favorites": 38, "rating": 4.7, "reviewCount": 14, "carbonSaved": 35.6, "wasteReduced": 18.9, "location": "Bangalore, Karnataka", "createdAt": "2025-08-30"}, {"id": "12", "title": "PlayStation 5 Console", "description": "PlayStation 5 console in excellent condition. Includes controller and original box. Perfect for gaming enthusiasts. All components tested and working perfectly.", "category": "Electronics", "subcategory": "Gaming", "condition": "like_new", "price": 37349, "originalPrice": 49799, "currency": "INR", "images": ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop&sat=-15", "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 82, "badges": ["PlayStation 5", "Complete", "Gaming"], "views": 298, "favorites": 87, "rating": 4.9, "reviewCount": 26, "carbonSaved": 19.8, "wasteReduced": 4.2, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-22"}, {"id": "13", "title": "Winter Wool Coat", "description": "Warm winter wool coat in charcoal gray. Size L. Perfect for cold weather and sustainable fashion choices. Classic design that never goes out of style.", "category": "Clothing", "subcategory": "Coats", "condition": "good", "price": 6639, "originalPrice": 20749, "currency": "INR", "images": ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 89, "badges": ["Wool", "Winter", "Warm"], "views": 134, "favorites": 31, "rating": 4.6, "reviewCount": 13, "carbonSaved": 11.3, "wasteReduced": 2.9, "location": "Bangalore, Karnataka", "createdAt": "2025-08-18"}, {"id": "14", "title": "Complete Garden Tool Set", "description": "Complete garden tool set with rake, shovel, pruners, hand tools, and more. Perfect for sustainable gardening and outdoor maintenance. All tools in working condition.", "category": "Home & Garden", "subcategory": "Tools", "condition": "good", "price": 4149, "originalPrice": 10789, "currency": "INR", "images": ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1429454067104-3384827fce78?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 88, "badges": ["Complete Set", "Gardening", "Tools"], "views": 89, "favorites": 22, "rating": 4.4, "reviewCount": 9, "carbonSaved": 8.7, "wasteReduced": 3.4, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-12"}, {"id": "15", "title": "Comfortable Sofa Set", "description": "3-piece sofa set in beige fabric. Very comfortable and in good condition. Perfect for living room or family room. Cushions are firm and supportive.", "category": "Furniture", "subcategory": "Sofas", "condition": "good", "price": 33199, "originalPrice": 107899, "currency": "INR", "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 91, "badges": ["3-Piece Set", "Comfortable", "Beige"], "views": 203, "favorites": 49, "rating": 4.8, "reviewCount": 21, "carbonSaved": 78.9, "wasteReduced": 45.6, "location": "Bangalore, Karnataka", "createdAt": "2025-08-10"}, {"id": "16", "title": "Bluetooth Noise-Canceling Headphones", "description": "High-quality wireless Bluetooth headphones with active noise cancellation. Excellent sound quality and 30-hour battery life. Perfect for work and travel.", "category": "Electronics", "subcategory": "Audio", "condition": "like_new", "price": 10789, "originalPrice": 24899, "currency": "INR", "images": ["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 84, "badges": ["Wireless", "Noise Canceling", "Premium"], "views": 167, "favorites": 44, "rating": 4.7, "reviewCount": 18, "carbonSaved": 9.8, "wasteReduced": 1.8, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-08"}, {"id": "17", "title": "Classic Blue Denim Jeans", "description": "Classic blue denim jeans, size 32x32. Levi's brand in great condition. Perfect for casual wear and sustainable fashion. Comfortable fit with authentic wash.", "category": "Clothing", "subcategory": "Jeans", "condition": "good", "price": 3319, "originalPrice": 7469, "currency": "INR", "images": ["https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 86, "badges": ["Levi's Brand", "Classic Blue", "32x32"], "views": 145, "favorites": 33, "rating": 4.5, "reviewCount": 12, "carbonSaved": 6.4, "wasteReduced": 1.2, "location": "Bangalore, Karnataka", "createdAt": "2025-08-05"}, {"id": "18", "title": "Professional Tennis Racket Set", "description": "Professional tennis racket set with 2 rackets and accessories. Perfect for sports enthusiasts and sustainable recreation. Rackets are in excellent playing condition.", "category": "Sports", "subcategory": "Tennis", "condition": "good", "price": 7469, "originalPrice": 16599, "currency": "INR", "images": ["https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 87, "badges": ["Professional", "Complete Set", "Tennis"], "views": 112, "favorites": 26, "rating": 4.6, "reviewCount": 10, "carbonSaved": 12.1, "wasteReduced": 4.5, "location": "Mumbai, Maharashtra", "createdAt": "2025-08-02"}, {"id": "19", "title": "Ceramic Decorative Vases Set", "description": "Set of 3 beautiful ceramic vases in different sizes and earth tones. Perfect for home decoration and sustainable living spaces. Excellent condition with no chips or cracks.", "category": "Home & Garden", "subcategory": "Decor", "condition": "like_new", "price": 2904, "originalPrice": 7469, "currency": "INR", "images": ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"], "sellerId": "2", "sellerName": "Priya Patel", "sellerLocation": "Bangalore, Karnataka", "sustainabilityScore": 85, "badges": ["Ceramic", "Set of 3", "Decorative"], "views": 78, "favorites": 19, "rating": 4.7, "reviewCount": 7, "carbonSaved": 4.2, "wasteReduced": 1.8, "location": "Bangalore, Karnataka", "createdAt": "2025-07-28"}, {"id": "20", "title": "Yoga Equipment Bundle", "description": "Complete yoga set with premium mat, blocks, strap, and meditation cushion. Perfect for home practice and sustainable wellness. All items lightly used and sanitized.", "category": "Sports", "subcategory": "Fitness", "condition": "like_new", "price": 4979, "originalPrice": 12449, "currency": "INR", "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"], "sellerId": "1", "sellerName": "Arjun Sharma", "sellerLocation": "Mumbai, Maharashtra", "sustainabilityScore": 92, "badges": ["Complete Set", "Yoga", "Wellness"], "views": 134, "favorites": 41, "rating": 4.8, "reviewCount": 15, "carbonSaved": 8.9, "wasteReduced": 3.1, "location": "Mumbai, Maharashtra", "createdAt": "2025-07-25"}], "categories": ["All Categories", "Furniture", "Electronics", "Clothing", "Sports", "Home & Garden"], "ecoTips": [{"id": "1", "title": "Extend Product Lifespan", "content": "Proper care and maintenance can double the lifespan of most products. Clean regularly, store properly, and perform routine maintenance to keep items functioning optimally for Indian climate conditions.", "category": "General", "impact": "Reduces waste by 50%", "rating": 4.8, "helpful": 234}, {"id": "2", "title": "Buy Quality Over Quantity", "content": "Choose well-made items that last longer rather than cheaper alternatives that need frequent replacement. This saves money long-term and reduces environmental impact in India's growing economy.", "category": "Shopping", "impact": "Saves 40% on lifetime costs", "rating": 4.9, "helpful": 189}, {"id": "3", "title": "Repair Before Replace", "content": "Many items can be repaired instead of replaced. Learn basic repair skills or find local repair shops in Indian cities. YouTube tutorials can help with simple fixes.", "category": "Maintenance", "impact": "Prevents 30% of waste", "rating": 4.7, "helpful": 156}, {"id": "4", "title": "Share and Borrow in Community", "content": "For items used occasionally, consider sharing with neighbors or renting instead of buying new. This reduces individual environmental footprint significantly in Indian communities.", "category": "Community", "impact": "Reduces footprint by 25%", "rating": 4.6, "helpful": 143}], "achievements": [{"name": "Eco Warrior", "description": "Made 50+ sustainable purchases", "icon": "🌱", "points": 100, "progress": 85, "unlocked": true}, {"name": "Circular Champion", "description": "Sold 25+ items instead of discarding", "icon": "♻️", "points": 75, "progress": 92, "unlocked": true}, {"name": "Green Guardian", "description": "Saved 100+ kg CO2 equivalent", "icon": "🛡️", "points": 150, "progress": 78, "unlocked": true}, {"name": "Community Leader", "description": "Helped 10+ users with reviews and tips", "icon": "🤝", "points": 50, "progress": 100, "unlocked": true}], "carbonData": {"electronicsNew": {"co2": 150, "costINR": 66400}, "electronicsUsed": {"co2": 45, "costINR": 33200}, "furnitureNew": {"co2": 200, "costINR": 99600}, "furnitureUsed": {"co2": 60, "costINR": 24900}, "clothingNew": {"co2": 50, "costINR": 16600}, "clothingUsed": {"co2": 15, "costINR": 6640}}, "impactStats": {"totalUsers": 15672, "totalCO2Saved": 2847.3, "totalWastePrevented": 1234.7, "totalMoneySavedINR": 37913267, "communityAverage": {"co2Saved": 89.2, "wasteReduced": 23.4, "moneySavedINR": 74180}}};
        
        this.users = data.users;
        this.products = data.products;
        this.categories = data.categories;
        this.achievements = data.achievements;
        this.ecoTips = data.ecoTips || [];
        this.carbonData = data.carbonData || {};
        this.impactStats = data.impactStats || {};
        this.filteredProducts = [...this.products];
        
        // Initialize some sample purchases for demo with INR pricing
        this.purchases = [
            {
                id: "p1",
                date: "2025-08-15",
                total: 24899,
                currency: "INR",
                products: [
                    {
                        id: "1",
                        title: "Vintage Oak Dining Table",
                        price: 24899,
                        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
                        seller: "Priya Patel"
                    }
                ]
            }
        ];

        // Load categories into dropdowns immediately
        this.populateCategories();
    }

    initializeEventListeners() {
        // Navigation - Fixed navigation handling
        document.addEventListener('click', (e) => {
            // Handle navigation links with proper event handling
            if (e.target.matches('[data-page]') || e.target.closest('[data-page]')) {
                e.preventDefault();
                e.stopPropagation();
                const element = e.target.matches('[data-page]') ? e.target : e.target.closest('[data-page]');
                const page = element.getAttribute('data-page');
                console.log('Navigating to page:', page);
                this.showPage(page);
                return;
            }

            // Handle product card clicks - Fixed product modal opening
            if (e.target.closest('.product-card')) {
                const productCard = e.target.closest('.product-card');
                // Don't trigger if clicking on action buttons
                if (!e.target.closest('.product-actions')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const productId = productCard.dataset.productId;
                    console.log('Opening product modal for ID:', productId);
                    if (productId) {
                        this.showProductDetail(this.products.find(p => p.id === productId));
                    }
                }
                return;
            }
        });

        // User menu toggle
        const userAvatar = document.getElementById('userAvatar');
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (userAvatar && dropdownMenu) {
            userAvatar.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.user-dropdown')) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }

        // Auth form
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuth(e));
        }

        const authSwitchBtn = document.getElementById('authSwitchBtn');
        if (authSwitchBtn) {
            authSwitchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAuthMode();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Search and filters - Fixed search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch();
            });
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                }
            });
            // Enable typing in search input
            searchInput.addEventListener('input', () => {
                // Allow real-time search as user types
                if (searchInput.value.length > 2 || searchInput.value.length === 0) {
                    this.performSearch();
                }
            });
        }

        // Browse page search functionality
        const browseSearchBtn = document.getElementById('browseSearchBtn');
        const browseSearchInput = document.getElementById('browseSearchInput');
        if (browseSearchBtn && browseSearchInput) {
            browseSearchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performBrowseSearch();
            });
            browseSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performBrowseSearch();
                }
            });
        }

        // Fixed filter functionality
        const categoryFilter = document.getElementById('categoryFilter');
        const conditionFilter = document.getElementById('conditionFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                console.log('Category filter changed to:', e.target.value);
                this.applyFilters();
            });
        }
        if (conditionFilter) {
            conditionFilter.addEventListener('change', (e) => {
                console.log('Condition filter changed to:', e.target.value);
                this.applyFilters();
            });
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                console.log('Sort filter changed to:', e.target.value);
                this.applyFilters();
            });
        }

        // Browse page filters
        const browseCategoryFilter = document.getElementById('browseCategoryFilter');
        const browseConditionFilter = document.getElementById('browseConditionFilter');
        const browseSortFilter = document.getElementById('browseSortFilter');
        
        if (browseCategoryFilter) {
            browseCategoryFilter.addEventListener('change', (e) => {
                this.applyBrowseFilters();
            });
        }
        if (browseConditionFilter) {
            browseConditionFilter.addEventListener('change', (e) => {
                this.applyBrowseFilters();
            });
        }
        if (browseSortFilter) {
            browseSortFilter.addEventListener('change', (e) => {
                this.applyBrowseFilters();
            });
        }

        // Carbon calculator
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calculateCarbonFootprint();
            });
        }

        // Product form
        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', (e) => this.handleProductSubmit(e));
        }

        const cancelProductBtn = document.getElementById('cancelProductBtn');
        if (cancelProductBtn) {
            cancelProductBtn.addEventListener('click', () => this.showPage('my-listings'));
        }

        // Image upload
        const imageUploadArea = document.getElementById('imageUploadArea');
        const productImages = document.getElementById('productImages');
        if (imageUploadArea && productImages) {
            imageUploadArea.addEventListener('click', () => productImages.click());
            productImages.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        // Profile update
        const updateProfileBtn = document.getElementById('updateProfileBtn');
        if (updateProfileBtn) {
            updateProfileBtn.addEventListener('click', () => this.updateProfile());
        }

        // Avatar upload
        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
        }

        // Modal controls - Fixed modal functionality
        const closeProductModal = document.getElementById('closeProductModal');
        const productModalOverlay = document.getElementById('productModalOverlay');
        
        if (closeProductModal) {
            closeProductModal.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeProductModal();
            });
        }
        
        if (productModalOverlay) {
            productModalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeProductModal();
            });
        }

        // Modal action buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'addToCartBtn') {
                e.preventDefault();
                const productId = e.target.dataset.productId;
                if (productId) this.addToCart(productId);
            }
            
            if (e.target.id === 'addToWishlistBtn') {
                e.preventDefault();
                const productId = e.target.dataset.productId;
                if (productId) this.toggleWishlist(productId);
            }
        });

        // Keyboard support for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProductModal();
            }
        });

        // Cart actions
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    checkExistingSession() {
        // Check for demo mode - no loading delays
    }

    showPage(pageId) {
        console.log('Showing page:', pageId);
        
        // Hide all pages immediately
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page immediately
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageId;
            console.log('Page shown:', pageId);

            // Load page-specific content immediately
            switch (pageId) {
                case 'home':
                    this.loadProducts();
                    break;
                case 'browse':
                    this.loadBrowseProducts();
                    break;
                case 'carbon-calculator':
                    this.loadCarbonCalculator();
                    break;
                case 'impact-report':
                    this.loadImpactReport();
                    break;
                case 'eco-tips':
                    this.loadEcoTips();
                    break;
                case 'dashboard':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.loadDashboard();
                    break;
                case 'my-listings':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.loadUserListings();
                    break;
                case 'add-product':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.initializeProductForm();
                    break;
                case 'cart':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.loadCart();
                    break;
                case 'wishlist':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.loadWishlist();
                    break;
                case 'purchase-history':
                    if (!this.currentUser) {
                        this.showPage('login');
                        return;
                    }
                    this.loadPurchaseHistory();
                    break;
            }
        } else {
            console.error('Page not found:', pageId);
        }
    }

    loadBrowseProducts() {
        const browseProductsGrid = document.getElementById('browseProductsGrid');
        if (!browseProductsGrid) return;

        browseProductsGrid.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            browseProductsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-leaf"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        this.filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            browseProductsGrid.appendChild(productCard);
        });

        // Populate browse filters
        this.populateBrowseCategories();
    }

    loadCarbonCalculator() {
        // Initialize carbon calculator with real data
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.style.display = 'block';
        }
    }

    calculateCarbonFootprint() {
        const calcCategory = document.getElementById('calcCategory');
        const purchaseType = document.querySelector('input[name="purchaseType"]:checked');
        
        if (!calcCategory?.value || !purchaseType) {
            this.showNotification('Please select both category and purchase type', 'error');
            return;
        }

        const category = calcCategory.value;
        const type = purchaseType.value;
        
        const co2Result = document.getElementById('co2Result');
        const costResult = document.getElementById('costResult');
        const savingsResult = document.getElementById('savingsResult');

        let co2, cost, savings;

        if (type === 'new') {
            co2 = this.carbonData[category + 'New']?.co2 || 100;
            cost = this.carbonData[category + 'New']?.costINR || 50000;
            savings = 0;
        } else {
            const newCO2 = this.carbonData[category + 'New']?.co2 || 100;
            const newCost = this.carbonData[category + 'New']?.costINR || 50000;
            const usedCO2 = this.carbonData[category + 'Used']?.co2 || 30;
            const usedCost = this.carbonData[category + 'Used']?.costINR || 25000;
            
            co2 = usedCO2;
            cost = usedCost;
            savings = newCost - usedCost;
        }

        if (co2Result) co2Result.textContent = `${co2}kg CO₂`;
        if (costResult) costResult.textContent = this.formatINR(cost);
        if (savingsResult) savingsResult.textContent = savings > 0 ? `${this.formatINR(savings)} saved!` : 'No savings';

        // Create chart
        this.createCarbonChart(category, type);

        this.showNotification('Carbon footprint calculated successfully!', 'success');
    }

    createCarbonChart(category, type) {
        const ctx = document.getElementById('carbonChart');
        if (!ctx) return;

        // Clear previous chart
        if (this.carbonChart) {
            this.carbonChart.destroy();
        }

        const newCO2 = this.carbonData[category + 'New']?.co2 || 100;
        const usedCO2 = this.carbonData[category + 'Used']?.co2 || 30;

        this.carbonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Buy New', 'Buy Second-hand'],
                datasets: [{
                    label: 'CO₂ Emissions (kg)',
                    data: [newCO2, usedCO2],
                    backgroundColor: ['#B4413C', '#1FB8CD'],
                    borderColor: ['#944454', '#13343B'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Carbon Impact Comparison - ${category}`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'CO₂ Emissions (kg)'
                        }
                    }
                }
            }
        });
    }

    loadImpactReport() {
        this.createMonthlyChart();
        this.createCategoryChart();
    }

    createMonthlyChart() {
        const ctx = document.getElementById('monthlyChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'CO₂ Saved (kg)',
                    data: [120, 190, 300, 500, 420, 300],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Electronics', 'Furniture', 'Clothing', 'Sports', 'Home & Garden'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    loadEcoTips() {
        const ecoTipsGrid = document.getElementById('ecoTipsGrid');
        if (!ecoTipsGrid) return;

        ecoTipsGrid.innerHTML = this.ecoTips.map(tip => `
            <div class="tip-card">
                <h3 class="tip-title">${tip.title}</h3>
                <p class="tip-content">${tip.content}</p>
                <div class="tip-impact">${tip.impact}</div>
                <div class="tip-meta">
                    <span>⭐ ${tip.rating}/5</span>
                    <span>${tip.helpful} found helpful</span>
                </div>
            </div>
        `).join('');
    }

    performBrowseSearch() {
        this.applyBrowseFilters();
    }

    applyBrowseFilters() {
        const browseCategoryFilter = document.getElementById('browseCategoryFilter');
        const browseConditionFilter = document.getElementById('browseConditionFilter');
        const browseSortFilter = document.getElementById('browseSortFilter');

        if (!browseCategoryFilter || !browseConditionFilter || !browseSortFilter) return;

        const categoryValue = browseCategoryFilter.value;
        const conditionValue = browseConditionFilter.value;
        const sortValue = browseSortFilter.value;

        // Start with all products
        let filtered = [...this.products];

        // Apply search filter first
        const browseSearchInput = document.getElementById('browseSearchInput');
        const query = browseSearchInput?.value?.toLowerCase().trim() || '';
        if (query) {
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (categoryValue) {
            filtered = filtered.filter(product => product.category === categoryValue);
        }

        // Apply condition filter
        if (conditionValue) {
            filtered = filtered.filter(product => product.condition === conditionValue);
        }

        // Apply sorting
        switch (sortValue) {
            case 'price_low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'sustainability':
                filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
                break;
            default:
                filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        }

        this.filteredProducts = filtered;
        this.loadBrowseProducts();
    }

    populateBrowseCategories() {
        const browseCategoryFilter = document.getElementById('browseCategoryFilter');
        if (browseCategoryFilter && browseCategoryFilter.children.length <= 1) {
            this.categories.slice(1).forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                browseCategoryFilter.appendChild(option);
            });
        }
    }

    toggleAuthMode() {
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        const authSubmitBtn = document.getElementById('authSubmitBtn');
        const authSwitchText = document.getElementById('authSwitchText');
        const usernameGroup = document.getElementById('usernameGroup');
        const fullNameGroup = document.getElementById('fullNameGroup');

        const isLogin = authSubmitBtn.textContent === 'Sign In';

        if (isLogin) {
            // Switch to register mode
            authTitle.textContent = 'Join EcoFinds';
            authSubtitle.textContent = 'Create your sustainable account';
            authSubmitBtn.textContent = 'Sign Up';
            authSwitchText.innerHTML = 'Already have an account? <button type="button" id="authSwitchBtn" class="link-btn">Sign in</button>';
            usernameGroup.classList.remove('hidden');
            fullNameGroup.classList.remove('hidden');
        } else {
            // Switch to login mode
            authTitle.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Sign in to your account';
            authSubmitBtn.textContent = 'Sign In';
            authSwitchText.innerHTML = 'Don\'t have an account? <button type="button" id="authSwitchBtn" class="link-btn">Sign up</button>';
            usernameGroup.classList.add('hidden');
            fullNameGroup.classList.add('hidden');
        }

        // Reattach event listener to new button
        const newSwitchBtn = document.getElementById('authSwitchBtn');
        if (newSwitchBtn) {
            newSwitchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAuthMode();
            });
        }
    }

    handleAuth(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const fullName = document.getElementById('fullName').value;
        const isLogin = document.getElementById('authSubmitBtn').textContent === 'Sign In';

        if (isLogin) {
            // Login logic - instant authentication
            const user = this.users.find(u => u.email === email);
            if (user || email === 'demo@ecofinds.com') {
                this.currentUser = user || {
                    id: 'demo',
                    username: 'demo_user',
                    email: 'demo@ecofinds.com',
                    fullName: 'Demo User',
                    ecoPoints: 75,
                    sustainabilityScore: 65,
                    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                    achievements: ['Eco Warrior'],
                    moneySaved: 12450,
                    carbonSaved: 25.6,
                    wasteReduced: 8.9
                };
                this.updateUIForLoggedInUser();
                this.showPage('dashboard');
                this.showNotification('Welcome back to EcoFinds!', 'success');
            } else {
                this.showNotification('Invalid email or password', 'error');
            }
        } else {
            // Register logic - instant registration
            const newUser = {
                id: Date.now().toString(),
                username: username || 'new_user',
                email: email,
                fullName: fullName || 'New User',
                ecoPoints: 25,
                sustainabilityScore: 10,
                profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                achievements: [],
                moneySaved: 0,
                carbonSaved: 0,
                wasteReduced: 0
            };
            
            this.users.push(newUser);
            this.currentUser = newUser;
            this.updateUIForLoggedInUser();
            this.showPage('dashboard');
            this.showNotification('Welcome to EcoFinds! Start your sustainable journey.', 'success');
            
            // Award welcome points instantly
            this.awardPoints(25, 'Welcome Bonus');
        }
    }

    logout() {
        this.currentUser = null;
        this.updateUIForLoggedOutUser();
        this.showPage('home');
        this.showNotification('You have been logged out.', 'info');
    }

    updateUIForLoggedInUser() {
        const loginLink = document.getElementById('loginLink');
        const userDropdown = document.getElementById('userDropdown');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userAvatarImg = document.getElementById('userAvatarImg');

        if (loginLink) loginLink.classList.add('hidden');
        if (userDropdown) userDropdown.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.textContent = this.currentUser.username;
        if (userAvatarImg) userAvatarImg.src = this.currentUser.profileImage;
        
        this.updateCartCount();
    }

    updateUIForLoggedOutUser() {
        const loginLink = document.getElementById('loginLink');
        const userDropdown = document.getElementById('userDropdown');

        if (loginLink) loginLink.classList.remove('hidden');
        if (userDropdown) userDropdown.classList.add('hidden');
        
        this.updateCartCount();
    }

    populateCategories() {
        const categorySelects = document.querySelectorAll('#categoryFilter, #productCategory, #browseCategoryFilter');
        categorySelects.forEach(select => {
            if (select.children.length <= 1) { // Only populate if not already populated
                this.categories.slice(1).forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    select.appendChild(option);
                });
            }
        });
    }

    loadProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Clear grid instantly
        productsGrid.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-leaf"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        // Load products instantly
        this.filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        const savingsPercent = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        // Format price in Indian Rupees
        const formattedPrice = this.formatINR(product.price);
        const formattedOriginalPrice = product.originalPrice ? this.formatINR(product.originalPrice) : null;

        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${formattedPrice}</span>
                    ${formattedOriginalPrice ? `<span class="original-price">${formattedOriginalPrice}</span>` : ''}
                </div>
                <div class="product-condition status status--success">${this.formatCondition(product.condition)}</div>
                <div class="product-badges">
                    ${product.badges.map(badge => `<span class="eco-badge">${badge}</span>`).join('')}
                </div>
                <div class="product-meta">
                    <span class="sustainability-score">♻️ ${product.sustainabilityScore}/100</span>
                    <span>${product.views} views</span>
                </div>
                ${savingsPercent > 0 ? `<div class="savings">Save ${savingsPercent}%</div>` : ''}
                <div class="product-actions">
                    <button class="btn btn--primary btn--sm" onclick="event.stopPropagation(); window.app.addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="event.stopPropagation(); window.app.toggleWishlist('${product.id}')">
                        <i class="fas fa-heart ${this.isInWishlist(product.id) ? 'text-error' : ''}"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    formatINR(amount) {
        // Format amount in Indian Rupees with proper comma separation
        return '₹' + amount.toLocaleString('en-IN');
    }

    formatCondition(condition) {
        return condition.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    performSearch() {
        this.applyFilters();
    }

    applyFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const conditionFilter = document.getElementById('conditionFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (!categoryFilter || !conditionFilter || !sortFilter) {
            return;
        }

        const categoryValue = categoryFilter.value;
        const conditionValue = conditionFilter.value;
        const sortValue = sortFilter.value;

        // Start with all products, not filtered products
        let filtered = [...this.products];

        // Apply search filter first if there's a search term
        const searchInput = document.getElementById('searchInput');
        const query = searchInput?.value?.toLowerCase().trim() || '';
        if (query) {
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (categoryValue) {
            filtered = filtered.filter(product => product.category === categoryValue);
        }

        // Apply condition filter
        if (conditionValue) {
            filtered = filtered.filter(product => product.condition === conditionValue);
        }

        // Apply sorting
        switch (sortValue) {
            case 'price_low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'sustainability':
                filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
                break;
            default:
                filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        }

        this.filteredProducts = filtered;
        this.loadProducts();
    }

    showProductDetail(product) {
        if (!product) return;
        
        console.log('Showing product detail for:', product.title);
        
        const modal = document.getElementById('productModal');
        if (!modal) return;

        // Update modal content immediately
        const elements = {
            modalTitle: document.getElementById('modalProductTitle'),
            modalTitleFull: document.getElementById('modalProductTitleFull'),
            modalMainImage: document.getElementById('modalMainImage'),
            modalImageThumbnails: document.getElementById('modalImageThumbnails'),
            modalProductPrice: document.getElementById('modalProductPrice'),
            modalProductOriginalPrice: document.getElementById('modalProductOriginalPrice'),
            modalProductBadges: document.getElementById('modalProductBadges'),
            modalProductCondition: document.getElementById('modalProductCondition'),
            modalSustainabilityScore: document.getElementById('modalSustainabilityScore'),
            modalProductViews: document.getElementById('modalProductViews'),
            modalProductDescription: document.getElementById('modalProductDescription'),
            modalSellerName: document.getElementById('modalSellerName'),
            modalSellerRating: document.getElementById('modalSellerRating'),
            addToCartBtn: document.getElementById('addToCartBtn'),
            addToWishlistBtn: document.getElementById('addToWishlistBtn')
        };

        // Update all elements with product data - using INR formatting
        if (elements.modalTitle) elements.modalTitle.textContent = product.title;
        if (elements.modalTitleFull) elements.modalTitleFull.textContent = product.title;
        if (elements.modalMainImage) elements.modalMainImage.src = product.images[0];
        if (elements.modalProductPrice) elements.modalProductPrice.textContent = this.formatINR(product.price);
        
        if (elements.modalProductOriginalPrice) {
            if (product.originalPrice) {
                elements.modalProductOriginalPrice.textContent = this.formatINR(product.originalPrice);
                elements.modalProductOriginalPrice.style.display = 'inline';
            } else {
                elements.modalProductOriginalPrice.style.display = 'none';
            }
        }
        
        if (elements.modalProductCondition) elements.modalProductCondition.textContent = this.formatCondition(product.condition);
        if (elements.modalSustainabilityScore) elements.modalSustainabilityScore.textContent = `${product.sustainabilityScore}/100`;
        if (elements.modalProductViews) elements.modalProductViews.textContent = product.views;
        if (elements.modalProductDescription) elements.modalProductDescription.textContent = product.description;
        if (elements.modalSellerName) elements.modalSellerName.textContent = product.sellerName;
        if (elements.modalSellerRating) elements.modalSellerRating.textContent = `⭐ ${product.rating || 'No rating'}`;

        // Update badges
        if (elements.modalProductBadges) {
            elements.modalProductBadges.innerHTML = product.badges.map(badge => 
                `<span class="eco-badge">${badge}</span>`
            ).join('');
        }

        // Update thumbnails
        if (elements.modalImageThumbnails) {
            elements.modalImageThumbnails.innerHTML = product.images.map((image, index) => 
                `<img src="${image}" alt="Product ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="window.app.switchMainImage('${image}', this)">`
            ).join('');
        }

        // Set product ID on action buttons
        if (elements.addToCartBtn) elements.addToCartBtn.dataset.productId = product.id;
        if (elements.addToWishlistBtn) elements.addToWishlistBtn.dataset.productId = product.id;

        // Show modal instantly
        modal.classList.remove('hidden');
        console.log('Product modal shown');
    }

    switchMainImage(imageSrc, thumbnail) {
        const modalMainImage = document.getElementById('modalMainImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (modalMainImage) modalMainImage.src = imageSrc;
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        if (thumbnail) thumbnail.classList.add('active');
    }

    closeProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('hidden');
            console.log('Product modal closed');
        }
    }

    addToCart(productId) {
        if (!this.currentUser) {
            this.showPage('login');
            return;
        }

        const existingItem = this.cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                productId: productId,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.updateCartCount();
        this.showNotification('Product added to cart!', 'success');
        
        // Award points instantly
        this.awardPoints(5, 'Added to Cart');
        
        // Close modal if open
        this.closeProductModal();
    }

    toggleWishlist(productId) {
        if (!this.currentUser) {
            this.showPage('login');
            return;
        }

        const index = this.wishlist.findIndex(item => item.productId === productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.wishlist.push({
                productId: productId,
                addedAt: new Date().toISOString()
            });
            this.showNotification('Added to wishlist!', 'success');
            this.awardPoints(2, 'Added to Wishlist');
        }

        // Update UI instantly
        if (this.currentPage === 'home' || this.currentPage === 'browse') {
            this.loadProducts();
            if (this.currentPage === 'browse') this.loadBrowseProducts();
        } else if (this.currentPage === 'wishlist') {
            this.loadWishlist();
        }
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.productId === productId);
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    loadDashboard() {
        if (!this.currentUser) return;

        // Update profile fields instantly
        const elements = {
            profileUsername: document.getElementById('profileUsername'),
            profileFullName: document.getElementById('profileFullName'),
            profileEmail: document.getElementById('profileEmail'),
            dashboardAvatar: document.getElementById('dashboardAvatar'),
            userEcoPoints: document.getElementById('userEcoPoints'),
            userSustainabilityScore: document.getElementById('userSustainabilityScore'),
            userAchievements: document.getElementById('userAchievements')
        };

        if (elements.profileUsername) elements.profileUsername.value = this.currentUser.username || '';
        if (elements.profileFullName) elements.profileFullName.value = this.currentUser.fullName || '';
        if (elements.profileEmail) elements.profileEmail.value = this.currentUser.email || '';
        if (elements.dashboardAvatar) elements.dashboardAvatar.src = this.currentUser.profileImage;
        if (elements.userEcoPoints) elements.userEcoPoints.textContent = this.currentUser.ecoPoints || 0;
        if (elements.userSustainabilityScore) elements.userSustainabilityScore.textContent = this.currentUser.sustainabilityScore || 0;

        // Load achievements instantly
        if (elements.userAchievements) {
            elements.userAchievements.innerHTML = this.achievements.map(achievement => {
                const hasAchievement = this.currentUser.achievements.includes(achievement.name);
                return `
                    <div class="achievement-item ${hasAchievement ? '' : 'opacity-50'}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <span class="achievement-name">${achievement.name}</span>
                        <span class="achievement-desc">${achievement.description}</span>
                        ${hasAchievement ? `<div class="status status--success">Earned</div>` : ''}
                    </div>
                `;
            }).join('');
        }
    }

    updateProfile() {
        if (!this.currentUser) return;
        
        const profileUsername = document.getElementById('profileUsername');
        const profileFullName = document.getElementById('profileFullName');
        const profileEmail = document.getElementById('profileEmail');

        if (profileUsername) this.currentUser.username = profileUsername.value;
        if (profileFullName) this.currentUser.fullName = profileFullName.value;
        if (profileEmail) this.currentUser.email = profileEmail.value;

        this.updateUIForLoggedInUser();
        this.showNotification('Profile updated successfully!', 'success');
    }

    handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (file && this.currentUser) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newAvatar = e.target.result;
                this.currentUser.profileImage = newAvatar;
                
                // Update all avatar images instantly
                const dashboardAvatar = document.getElementById('dashboardAvatar');
                const userAvatarImg = document.getElementById('userAvatarImg');
                
                if (dashboardAvatar) dashboardAvatar.src = newAvatar;
                if (userAvatarImg) userAvatarImg.src = newAvatar;
                
                this.showNotification('Profile picture updated!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    initializeProductForm() {
        const productFormTitle = document.getElementById('productFormTitle');
        const productForm = document.getElementById('productForm');

        if (this.editingProduct) {
            if (productFormTitle) productFormTitle.textContent = 'Edit Product';
            this.populateProductForm(this.editingProduct);
        } else {
            if (productFormTitle) productFormTitle.textContent = 'Add New Product';
            if (productForm) productForm.reset();
            const imagePreview = document.getElementById('imagePreview');
            if (imagePreview) imagePreview.innerHTML = '';
        }
    }

    loadUserListings() {
        const myListingsGrid = document.getElementById('myListingsGrid');
        if (myListingsGrid) {
            // Show sample user listings with INR pricing
            const userProducts = this.products.filter(p => p.sellerId === this.currentUser?.id).slice(0, 3);
            
            if (userProducts.length === 0) {
                myListingsGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-plus"></i>
                        <h3>No listings yet</h3>
                        <p>Start selling your items to help the environment!</p>
                        <button class="btn btn--primary" data-page="add-product">Add Your First Product</button>
                    </div>
                `;
            } else {
                myListingsGrid.innerHTML = userProducts.map(product => `
                    <div class="listing-card">
                        <img src="${product.images[0]}" alt="${product.title}" class="product-image">
                        <div class="listing-info">
                            <h3>${product.title}</h3>
                            <p class="current-price">${this.formatINR(product.price)}</p>
                            <p>${product.views} views • ${product.favorites} favorites</p>
                        </div>
                        <div class="listing-actions">
                            <button class="btn btn--sm btn--secondary">Edit</button>
                            <button class="btn btn--sm btn--outline">Delete</button>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    loadCart() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some sustainable products to get started!</p>
                    <button class="btn btn--primary" data-page="home">Browse Products</button>
                </div>
            `;
            if (cartSubtotal) cartSubtotal.textContent = '₹0';
            if (cartTotal) cartTotal.textContent = '₹0';
            return;
        }

        // Display cart items with INR pricing
        let total = 0;
        cartItems.innerHTML = this.cart.map(cartItem => {
            const product = this.products.find(p => p.id === cartItem.productId);
            if (!product) return '';
            
            const itemTotal = product.price * cartItem.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item">
                    <img src="${product.images[0]}" alt="${product.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${product.title}</h3>
                        <div class="cart-item-price">${this.formatINR(product.price)}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="window.app.updateCartQuantity('${product.id}', -1)">-</button>
                                <span>${cartItem.quantity}</span>
                                <button class="quantity-btn" onclick="window.app.updateCartQuantity('${product.id}', 1)">+</button>
                            </div>
                            <button class="btn btn--sm btn--outline" onclick="window.app.removeFromCart('${product.id}')">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        if (cartSubtotal) cartSubtotal.textContent = this.formatINR(total);
        if (cartTotal) cartTotal.textContent = this.formatINR(total);
    }

    loadWishlist() {
        const wishlistGrid = document.getElementById('wishlistGrid');
        if (!wishlistGrid) return;

        if (this.wishlist.length === 0) {
            wishlistGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Save products you love for later!</p>
                    <button class="btn btn--primary" data-page="home">Browse Products</button>
                </div>
            `;
            return;
        }

        // Display wishlist items
        const wishlistProducts = this.wishlist.map(item => 
            this.products.find(p => p.id === item.productId)
        ).filter(Boolean);
        
        wishlistGrid.innerHTML = wishlistProducts.map(product => 
            this.createProductCard(product).outerHTML
        ).join('');
    }

    loadPurchaseHistory() {
        const purchasesList = document.getElementById('purchasesList');
        if (!purchasesList) return;

        if (this.purchases.length === 0) {
            purchasesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>No purchases yet</h3>
                    <p>Start shopping sustainably to see your order history here!</p>
                    <button class="btn btn--primary" data-page="home">Browse Products</button>
                </div>
            `;
            return;
        }

        // Display purchase history with INR pricing
        purchasesList.innerHTML = this.purchases.map(purchase => `
            <div class="purchase-item">
                <div class="purchase-header">
                    <div>
                        <h3>Order #${purchase.id}</h3>
                        <p>Date: ${purchase.date}</p>
                    </div>
                    <div class="purchase-total">
                        <strong>${this.formatINR(purchase.total)}</strong>
                    </div>
                </div>
                <div class="purchase-products">
                    ${purchase.products.map(product => `
                        <div class="purchase-product">
                            <img src="${product.image}" alt="${product.title}" class="purchase-product-image">
                            <div class="purchase-product-info">
                                <h4>${product.title}</h4>
                                <p>Seller: ${product.seller}</p>
                                <p class="price">${this.formatINR(product.price)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    updateCartQuantity(productId, change) {
        const cartItem = this.cart.find(item => item.productId === productId);
        if (!cartItem) return;
        
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        this.updateCartCount();
        this.loadCart();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.updateCartCount();
        this.loadCart();
        this.showNotification('Item removed from cart', 'info');
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Calculate total in INR
        const total = this.cart.reduce((sum, item) => {
            const product = this.products.find(p => p.id === item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        
        // Create purchase record
        const purchase = {
            id: `P${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            total: total,
            currency: 'INR',
            products: this.cart.map(item => {
                const product = this.products.find(p => p.id === item.productId);
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity,
                    image: product.images[0],
                    seller: product.sellerName
                };
            })
        };
        
        this.purchases.unshift(purchase);
        this.cart = [];
        this.updateCartCount();
        
        // Award points for purchase
        this.awardPoints(Math.floor(total / 100), 'Purchase Completed');
        
        this.showNotification(`🎉 Purchase successful! Total: ${this.formatINR(total)}. Thank you for shopping sustainably!`, 'success');
        this.showPage('purchase-history');
    }

    awardPoints(points, reason) {
        if (!this.currentUser) return;
        
        this.currentUser.ecoPoints = (this.currentUser.ecoPoints || 0) + points;
        this.currentUser.sustainabilityScore = Math.min(100, (this.currentUser.sustainabilityScore || 0) + 1);
        
        // Show points notification immediately
        this.showNotification(`+${points} EcoPoints for ${reason}!`, 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element immediately
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add to page immediately
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Simplified stub methods
    populateProductForm(product) {}
    handleImageUpload(e) {}
    handleProductSubmit(e) { e.preventDefault(); }
}

// Initialize the application immediately when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing EcoFinds app');
    app = new EcoFindsApp();
    console.log('EcoFinds app initialized');
});

// Global functions for onclick handlers
window.app = {
    addToCart: (productId) => app?.addToCart(productId),
    toggleWishlist: (productId) => app?.toggleWishlist(productId),
    switchMainImage: (imageSrc, thumbnail) => app?.switchMainImage(imageSrc, thumbnail),
    updateCartQuantity: (productId, change) => app?.updateCartQuantity(productId, change),
    removeFromCart: (productId) => app?.removeFromCart(productId)
};