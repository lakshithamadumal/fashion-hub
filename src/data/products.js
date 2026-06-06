export const PRODUCTS = [
  {
    id: "w1",
    name: "Classic Silk Wrap Dress",
    category: "Women",
    price: 189.00,
    rating: 4.8,
    reviewsCount: 42,
    image: "/women_fashion.png",
    description: "Indulge in the luxury of pure mulberry silk. This elegant wrap dress features a flattering silhouette, adjustable waist tie, and a delicate floral detail. Perfect for warm evening soirées or high-end garden parties.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#FAF9F6" },
      { name: "Dusty Rose", hex: "#c29c92" },
      { name: "Sage Green", hex: "#87a987" }
    ],
    inStock: true,
    tag: "Best Seller"
  },
  {
    id: "m1",
    name: "Premium Linen Summer Shirt",
    category: "Men",
    price: 89.00,
    rating: 4.6,
    reviewsCount: 28,
    image: "/men_fashion.png",
    description: "Crafted from 100% breathable organic linen. Features a relaxed tailored fit, modern spread collar, and natural coconut-shell buttons. Specially washed for ultimate softness.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#e5d3b3" },
      { name: "Off White", hex: "#FAF9F6" },
      { name: "Navy Blue", hex: "#1e293b" }
    ],
    inStock: true,
    tag: "New Season"
  },
  {
    id: "a1",
    name: "Minimalist Gold Chronograph Watch",
    category: "Accessories",
    price: 299.00,
    rating: 4.9,
    reviewsCount: 15,
    image: "/fashion_accessories.png",
    description: "A timeless masterpiece featuring a 40mm brushed stainless steel case plated in 18k yellow gold. Swiss quartz movement, sapphire crystal glass, and a premium Italian leather strap.",
    sizes: ["One Size"],
    colors: [
      { name: "Gold / Brown", hex: "#d4af37" },
      { name: "Gold / Black", hex: "#111111" }
    ],
    inStock: true,
    tag: "Limited Edition"
  },
  {
    id: "s1",
    name: "Handcrafted Suede Loafers",
    category: "Shoes",
    price: 175.00,
    rating: 4.7,
    reviewsCount: 34,
    image: "/fashion_shoes.png",
    description: "Meticulously handcrafted in Italy from top-grade calfskin suede. Features a flexible rubber sole, cushioned leather footbed, and classic penny loafer strap. Offers premium comfort and timeless style.",
    sizes: ["8", "9", "10", "11", "12"],
    colors: [
      { name: "Tan", hex: "#a67c52" },
      { name: "Dark Brown", hex: "#5c4033" },
      { name: "Slate Grey", hex: "#6b7280" }
    ],
    inStock: true,
    tag: "Popular"
  },
  {
    id: "w2",
    name: "Summer Floral Maxi Dress",
    category: "Women",
    price: 145.00,
    rating: 4.9,
    reviewsCount: 56,
    image: "/hero_model.png",
    description: "Embrace the sunshine in this stunning, lightweight floral dress. Featuring a ruffled neckline, fitted bodice, and a flowing skirt, it's designed to elevate your fashion style effortlessly.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Floral Apricot", hex: "#fbeee6" },
      { name: "Peach Blossom", hex: "#f5b041" }
    ],
    inStock: true,
    tag: "Featured"
  },
  {
    id: "m2",
    name: "Slim Fit Sandstone Chinos",
    category: "Men",
    price: 95.00,
    rating: 4.5,
    reviewsCount: 19,
    image: "/men_fashion.png", // Reuse style matching image
    description: "Premium stretch cotton chinos designed for modern lifestyle trends. Tailored slim fit, side pockets, and premium button details. Soft, durable, and highly versatile.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Sandstone", hex: "#c8bba6" },
      { name: "Olive", hex: "#556b2f" }
    ],
    inStock: true,
    tag: "Essential"
  },
  {
    id: "a2",
    name: "Classic Tortoiseshell Sunglasses",
    category: "Accessories",
    price: 110.00,
    rating: 4.7,
    reviewsCount: 22,
    image: "/fashion_accessories.png",
    description: "Premium handcrafted acetate sunglasses in a classic round silhouette. Polarized lenses with 100% UVA/UVB protection and reinforced gold metal hinges.",
    sizes: ["One Size"],
    colors: [
      { name: "Tortoiseshell", hex: "#3e2723" },
      { name: "Black", hex: "#000000" }
    ],
    inStock: false,
    tag: "Sold Out"
  },
  {
    id: "s2",
    name: "Italian Leather Chelsea Boots",
    category: "Shoes",
    price: 245.00,
    rating: 4.8,
    reviewsCount: 17,
    image: "/fashion_shoes.png",
    description: "Sleek ankle boots made from premium full-grain Italian leather. Feature elasticated side panels, a pull tab, and a durable stacked leather heel. Perfectly matches formal and casual attire.",
    sizes: ["8", "9", "10", "11"],
    colors: [
      { name: "Chestnut Brown", hex: "#8b4513" },
      { name: "Midnight Black", hex: "#111111" }
    ],
    inStock: true,
    tag: "Premium"
  }
];

export const CATEGORIES = [
  { name: "Women", image: "/women_fashion.png", count: 18, desc: "Flowing dresses & elegant sets" },
  { name: "Men", image: "/men_fashion.png", count: 14, desc: "Tailored shirts & smart trousers" },
  { name: "Accessories", image: "/fashion_accessories.png", count: 24, desc: "Luxury watches & sunglasses" },
  { name: "Shoes", image: "/fashion_shoes.png", count: 12, desc: "Handcrafted loafers & boots" }
];
