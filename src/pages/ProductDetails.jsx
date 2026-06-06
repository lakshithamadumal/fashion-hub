import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowLeft, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductDetails({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist = [],
  setSelectedProduct,
  setActivePage 
}) {
  if (!product) return null;

  const { id, name, category, price, rating, reviewsCount, image, description, sizes, colors, tag, inStock } = product;

  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(colors[0] || { name: 'Cream', hex: '#FAF9F6' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedMessage, setAddedMessage] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedSize(sizes[0] || 'M');
    setSelectedColor(colors[0] || { name: 'Cream', hex: '#FAF9F6' });
    setQuantity(1);
  }, [product]);

  const isWishlisted = wishlist.some(w => w.id === id);

  // Filter 4 related products in the same category, excluding the current product
  const relatedProducts = PRODUCTS
    .filter(p => p.category === category && p.id !== id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    onAddToCart(cartItem);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleViewDetails = (relatedId) => {
    const prod = PRODUCTS.find(p => p.id === relatedId);
    setSelectedProduct(prod);
  };

  // Specs mockup based on product types
  const specs = {
    Women: [
      { key: "Composition", val: "100% Mulberry Silk, 19 Momme" },
      { key: "Care Instructions", val: "Dry Clean or gentle hand wash cold with silk detergent" },
      { key: "Weave Style", val: "Satin weave for smooth glossy finish" },
      { key: "Origin", val: "Ethically tailored in Sri Lanka" }
    ],
    Men: [
      { key: "Composition", val: "100% Organic Breathable Flax Linen" },
      { key: "Care Instructions", val: "Machine wash cold, lay flat to dry, warm iron if needed" },
      { key: "Fit", val: "Relaxed tailored profile" },
      { key: "Origin", val: "Ethically manufactured in Sri Lanka" }
    ],
    Accessories: [
      { key: "Material", val: "18k gold-plated 316L surgical stainless steel, Italian leather" },
      { key: "Movement", val: "Swiss Ronda Quartz Movement" },
      { key: "Water Resistance", val: "5 ATM (50 Meters)" },
      { key: "Glass", val: "Scratch-resistant Sapphire Crystal" }
    ],
    Shoes: [
      { key: "Material", val: "Premium calfskin suede, full-grain calfskin leather lining" },
      { key: "Insole", val: "Ortholite memory foam cushioned footbed" },
      { key: "Sole", val: "Non-slip anti-shock vulcanized rubber sole" },
      { key: "Origin", val: "Handcrafted in Florence, Italy" }
    ]
  };

  const productSpecs = specs[category] || specs["Women"];

  return (
    <div className="flex-1 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Back Link */}
      <button 
        onClick={() => setActivePage('shop')}
        className="mb-8 flex items-center gap-1.5 text-xs font-bold text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </button>

      {/* Product Presentation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image */}
        <div className="rounded-[32px] overflow-hidden border border-theme-border bg-theme-bg shadow-sm aspect-[4/5]">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          {/* Category & Badge */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-3 py-1 rounded-full">
              {category} Collection
            </span>
            {tag && (
              <span className="text-[9px] font-bold tracking-wider text-theme-bg bg-theme-text uppercase px-2.5 py-0.5 rounded-md">
                {tag}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-theme-text mt-4 leading-tight">
            {name}
          </h1>

          {/* Pricing & Review Summary */}
          <div className="flex flex-wrap items-center gap-6 mt-4 pb-6 border-b border-theme-border/60">
            <span className="text-2xl font-bold text-theme-text">${price.toFixed(2)}</span>
            
            <div className="flex items-center gap-2 border-l border-theme-border/60 pl-6 text-xs font-medium text-theme-muted">
              <div className="flex items-center text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? 'fill-current' : 'text-neutral-300'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-theme-text">{rating}</span>
              <span>({reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs text-theme-muted mt-6 leading-relaxed font-light">
            {description}
          </p>

          {/* Variants Selectors */}
          {inStock && (
            <div className="mt-8 space-y-6">
              
              {/* Color Selector */}
              {colors && colors.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-theme-text uppercase block mb-3">
                    Select Color: <span className="font-medium text-theme-muted">{selectedColor.name}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                            isSelected 
                              ? 'ring-2 ring-primary ring-offset-2 ring-offset-theme-bg' 
                              : 'border-black/10'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-white mix-blend-difference" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes && sizes.length > 0 && sizes[0] !== "One Size" && (
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-theme-text uppercase block mb-3">
                    Select Size: <span className="font-medium text-theme-muted">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-10 min-w-[44px] px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-theme-text border-theme-text text-theme-bg'
                              : 'border-theme-border text-theme-muted hover:border-theme-text hover:text-theme-text'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Counter & Add Buttons */}
              <div>
                <span className="text-[10px] font-bold tracking-wider text-theme-text uppercase block mb-3">
                  Quantity
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity selector box */}
                  <div className="flex items-center border border-theme-border rounded-2xl bg-theme-bg px-2 py-1.5 h-12">
                    <button
                      onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                      className="p-1.5 hover:text-primary rounded-full cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-theme-text">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-1.5 hover:text-primary rounded-full cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add To Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 min-w-[200px] h-12 bg-primary text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Shopping Bag
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`h-12 w-12 border rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                        : 'border-theme-border text-theme-muted hover:text-red-500 hover:bg-red-500/5'
                    }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Out of stock prompt */}
          {!inStock && (
            <div className="mt-8 p-4 bg-red-500/5 border border-red-500/10 text-red-600 rounded-2xl text-xs font-semibold">
              This seasonal style has sold out. Subscribe to notifications for restock alerts.
            </div>
          )}

          {/* Success Add Message */}
          {addedMessage && (
            <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 text-green-600 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <ShieldCheck className="w-4 h-4" />
              Item successfully added to your shopping bag!
            </div>
          )}

          {/* Accordion Tabs */}
          <div className="mt-12 border-t border-theme-border/60">
            {/* Tab Headers */}
            <div className="flex border-b border-theme-border/60 text-xs font-bold uppercase tracking-wider text-theme-muted">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 pr-6 border-b-2 -mb-[1px] transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-primary text-theme-text font-bold' 
                      : 'border-transparent hover:text-theme-text'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-6 text-xs text-theme-muted leading-relaxed font-light">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p>
                    Discover the hallmark of luxury tailoring. Every design in this collection focuses on comfort without compromising elegance, suitable for high-end styling or daily casual wear.
                  </p>
                  <p>
                    Crafted using sustainable manufacturing methods, our tailors handpick premium fibers that age gracefully. Pair this garment with our matching season items for a complete premium fashion presentation.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {productSpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-theme-border/30">
                      <span className="font-semibold text-theme-text">{spec.key}</span>
                      <span>{spec.val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {[
                    { name: "Sajith Bandara", rating: 5, date: "2 weeks ago", comment: "Absolutely stunning dress! The silk is so soft and draping is beautiful. Fits perfectly." },
                    { name: "Anura Perera", rating: 4, date: "1 month ago", comment: "Extremely comfortable linen fabric. Perfect fit for hot summer weather." }
                  ].map((rev, idx) => (
                    <div key={idx} className="border-b border-theme-border/30 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-theme-text">{rev.name}</span>
                        <span className="text-[10px] text-theme-muted">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-yellow-500 gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-current' : 'text-neutral-200'}`} />
                        ))}
                      </div>
                      <p className="mt-2 text-theme-muted italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS SECTION ================= */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-16 border-t border-theme-border">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-theme-text mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onViewDetails={handleViewDetails}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some(w => w.id === prod.id)}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
