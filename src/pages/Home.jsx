import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Heart, ShoppingBag, Eye, Percent, Phone, Mail } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Home({ 
  setActivePage, 
  onSelectCategory, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist = [],
  setSelectedProduct 
}) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = PRODUCTS.slice(0, 4);

  const handleViewDetails = (id) => {
    const prod = PRODUCTS.find(p => p.id === id);
    setSelectedProduct(prod);
    setActivePage('details');
  };

  return (
    <div className="flex-1 w-full">
      
      {/* 1. Hero Section (100% same as reference screenshot) */}
      <section className="relative w-full min-h-screen flex items-center bg-black overflow-hidden select-none">
        
        {/* Background Image of Model (floating right) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-2/3 h-full z-0 select-none">
          <img 
            src="/hero_model.png" 
            alt="New Season Collection Model" 
            className="w-full h-full object-cover object-[center_20%] select-none scale-[1.03] origin-bottom pointer-events-none"
          />
        </div>

        {/* Master Dark-to-Beige Vignette Overlay Gradient */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500" 
          style={{
            background: 'linear-gradient(to right, var(--hero-overlay-start) 0%, var(--hero-overlay-start) 40%, var(--hero-overlay-end) 75%, transparent 100%)'
          }}
        />



        {/* Content Container */}
        <div className="relative px-6 mx-auto max-w-7xl sm:px-8 lg:px-12 w-full z-20 pt-24 pb-28 md:py-24">
          <div className="max-w-xl text-left">
            {/* Tagline */}
            <span className="block text-xs font-bold tracking-[0.3em] text-neutral-300 uppercase mb-4 animate-fade-in">
              NEW SEASON COLLECTION
            </span>
            
            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 animate-fade-in-up">
              Elevate Your<br />Fashion Style
            </h1>
            
            {/* Body Description */}
            <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up">
              Discover premium fashion collections for men and women. Designed for elegance, comfort, and modern lifestyle trends.
            </p>

            {/* Buttons matching screen */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up">
              <button 
                onClick={() => setActivePage('shop')}
                className="px-7 py-3.5 bg-[#3b82f6] text-white text-xs font-bold rounded-full flex items-center gap-2 hover:bg-[#2563eb] hover:shadow-[0_0_25px_rgba(59,130,246,0.65)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.45)]"
              >
                Shop Collection →
              </button>
              
              <button 
                onClick={() => onSelectCategory('Women')}
                className="px-7 py-3.5 border border-white/40 text-white bg-white/5 backdrop-blur-xs text-xs font-bold rounded-full hover:bg-white/15 hover:border-white/70 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Explore Trends
              </button>
            </div>
          </div>
        </div>

        {/* Hero Footer Overlay Details */}
        <div className="absolute bottom-6 left-20 z-20 hidden sm:flex items-center gap-6 text-[10px] tracking-widest font-bold text-neutral-300/80 select-text">
          <a href="tel:+94771234567" className="hover:text-white transition-colors flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-neutral-300" />
            <span>+94 77 123 4567</span>
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
          <a href="mailto:support@fashionhub.com" className="hover:text-white transition-colors flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-neutral-300" />
            <span>support@fashionhub.com</span>
          </a>
        </div>

      </section>

      {/* 2. Featured Categories Section */}
      <section className="py-24 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-3 py-1 rounded-full">
            Curated Lines
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-theme-text mt-3">
            Shop by Category
          </h2>
          <p className="text-xs text-theme-muted mt-2">
            Explore our collections tailored for high-end fashion, daily comfort, and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard 
              key={cat.name} 
              category={cat} 
              onSelectCategory={onSelectCategory} 
            />
          ))}
        </div>
      </section>

      {/* 3. Promo Banner Section */}
      <section className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-theme-border bg-theme-card p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          {/* Subtle grid patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-xl text-left">
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              <Percent className="w-3.5 h-3.5" />
              Limited-Time Offer
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-theme-text">
              Get 10% Discount on Your First Order
            </h2>
            <p className="text-xs text-theme-muted mt-3 max-w-md leading-relaxed">
              Use code <span className="font-bold text-theme-text font-mono bg-theme-bg px-2 py-0.5 border border-theme-border rounded">STYLE10</span> at checkout. Enjoy free shipping on all orders over $150.
            </p>

            {/* Countdown timer UI */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds }
              ].map((time, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-2xl font-bold text-theme-text bg-theme-bg border border-theme-border rounded-xl px-3.5 py-1.5 min-w-[50px] text-center shadow-inner">
                      {String(time.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-semibold text-theme-muted uppercase tracking-wider mt-1">{time.label}</span>
                  </div>
                  {idx < 2 && <span className="text-lg font-bold text-theme-muted">:</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setActivePage('shop')}
              className="px-8 py-4 bg-theme-text text-theme-bg text-xs font-semibold rounded-2xl shadow-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Shop Collection Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Trending Products Section */}
      <section className="py-24 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-12 border-b border-theme-border/60 pb-6">
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-3 py-1 rounded-full">
              Highly Requested
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-theme-text mt-3">
              Trending New Arrivals
            </h2>
          </div>
          <button 
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-theme-text hover:text-primary transition-colors flex items-center gap-1.5 mt-4 sm:mt-0 group cursor-pointer"
          >
            View Entire Shop
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
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

      {/* 5. Brand Values Section */}
      <section className="py-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 border-t border-theme-border bg-theme-bg/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            {
              title: "Premium Materials",
              desc: "We exclusively source premium organic linen, mulberry silk, and top-grade Italian calf leather for long-lasting quality."
            },
            {
              title: "Ethically Handcrafted",
              desc: "Every fashion piece is crafted by skilled local tailors under fair and safe working environments with zero waste policies."
            },
            {
              title: "Eco-Friendly Delivery",
              desc: "Your packages are delivered in 100% biodegradable and recyclable custom packaging boxes to reduce carbon footprints."
            }
          ].map((val, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-theme-text">{val.title}</h3>
                <p className="text-xs text-theme-muted mt-2 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
