import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ThemePicker from './components/ThemePicker';
import WhatsappWidget from './components/WhatsappWidget';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import { Mail, Phone, MapPin, CheckCircle, ShoppingBag, Heart, User, ClipboardList } from 'lucide-react';
import { PRODUCTS } from './data/products';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState('warm-beige');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Apply theme class to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll to top when activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Cart operations
  const handleAddToCart = (itemToAdd) => {
    // Determine details matching existing item (id + size + color name)
    const size = itemToAdd.selectedSize || 'M';
    const color = itemToAdd.selectedColor || { name: 'Cream', hex: '#FAF9F6' };
    const qty = itemToAdd.quantity || 1;

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => 
          item.id === itemToAdd.id && 
          item.selectedSize === size && 
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const newItems = [...prevItems];
        newItems[existingIdx].quantity += qty;
        return newItems;
      } else {
        return [...prevItems, { 
          ...itemToAdd, 
          selectedSize: size, 
          selectedColor: color, 
          quantity: qty 
        }];
      }
    });
  };

  const handleUpdateQty = (itemToUpdate, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemToUpdate);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemToUpdate.id &&
        item.selectedSize === itemToUpdate.selectedSize &&
        item.selectedColor.name === itemToUpdate.selectedColor.name
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (itemToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.selectedSize === itemToRemove.selectedSize &&
            item.selectedColor.name === itemToRemove.selectedColor.name
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productToToggle) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === productToToggle.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== productToToggle.id);
      } else {
        return [...prevWishlist, productToToggle];
      }
    });
  };

  // Search routing
  const handleSearch = (text, category = 'All') => {
    setSearchQuery(text);
    setSelectedCategory(category);
    setActivePage('shop');
  };

  // Select category from category cards
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    setActivePage('shop');
  };

  // Proceed checkout helper
  const handleProceedCheckout = () => {
    setCartOpen(false);
    setActivePage('checkout');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        activePage={activePage}
        setActivePage={setActivePage}
        onSearch={handleSearch}
        openCartDrawer={() => setCartOpen(true)}
        openWishlistPage={() => setActivePage('wishlist')}
        transparent={activePage === 'home'}
      />

      {/* Main Content Router */}
      <main className="flex-grow flex flex-col">
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage}
            onSelectCategory={handleSelectCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {activePage === 'shop' && (
          <Shop 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'details' && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout 
            cartItems={cartItems}
            onClearCart={handleClearCart}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
        {activePage === 'profile' && <ProfilePage wishlistCount={wishlist.length} cartCount={cartItems.length} />}
        
        {activePage === 'wishlist' && (
          <WishlistPage 
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onRemoveWishlist={handleToggleWishlist}
            setActivePage={setActivePage}
            setSelectedProduct={setSelectedProduct}
          />
        )}
      </main>

      {/* Footer Details */}
      <Footer setActivePage={setActivePage} />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Floating Theme Customizer Picker */}
      <ThemePicker 
        currentTheme={theme}
        onChangeTheme={setTheme}
      />

      {/* Floating WhatsApp chat widget */}
      <WhatsappWidget />

    </div>
  );
}

/* ================= EXTRA PAGES (CONTACT, WISHLIST, PROFILE) ================= */

function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-grow px-4 mx-auto max-w-4xl py-12 text-left animate-fade-in select-text">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text mb-2">
        Contact Our Atelier
      </h1>
      <p className="text-xs text-theme-muted mb-10 font-light max-w-xl leading-relaxed">
        Have questions regarding sizing, custom fittings, or shipping destinations? Get in touch with our team of styling professionals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Side Details */}
        <div className="md:col-span-5 space-y-6 text-xs text-theme-muted leading-relaxed">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-theme-text mb-1 uppercase tracking-wider">Call Styling Hotline</h4>
              <a href="tel:+94771234567" className="hover:text-primary transition-colors block">+94 77 123 4567</a>
              <span className="block mt-0.5">Mon - Sat, 9am - 6pm (IST)</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-theme-text mb-1 uppercase tracking-wider">Email Inquiry</h4>
              <a href="mailto:support@fashionhub.com" className="hover:text-primary transition-colors block">support@fashionhub.com</a>
              <span className="block mt-0.5">Response within 24 working hours</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-theme-text mb-1 uppercase tracking-wider">Flagship Atelier</h4>
              <p>
                45 Galle Road, Colombo 03, Sri Lanka
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-theme-text">Message Dispatched</h3>
              <p className="text-xs text-theme-muted mt-2 max-w-xs leading-relaxed">
                Thank you. A stylist will review your query and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe your query..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-theme-text text-theme-bg text-xs font-semibold rounded-2xl hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ wishlistCount, cartCount }) {
  return (
    <div className="flex-grow px-4 mx-auto max-w-4xl py-12 text-left animate-fade-in">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text mb-2">
        My Account Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* User Card */}
        <div className="md:col-span-1 bg-theme-card border border-theme-border rounded-3xl p-6 text-center shadow-sm">
          <div className="w-20 h-20 bg-theme-bg text-theme-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-theme-border/60">
            <User className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-lg font-bold text-theme-text">John Doe</h3>
          <span className="text-[10px] text-theme-muted uppercase tracking-wider font-semibold">Premium Member</span>
          
          <div className="mt-6 pt-6 border-t border-theme-border/60 text-xs text-theme-muted space-y-2 text-left">
            <div>
              <span className="font-bold text-theme-text block">Registered Email</span>
              <span>john.doe@example.com</span>
            </div>
            <div>
              <span className="font-bold text-theme-text block">Phone Number</span>
              <span>+94 77 999 8888</span>
            </div>
          </div>
        </div>

        {/* Info Grid (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Wishlist Status */}
            <div className="bg-theme-card border border-theme-border rounded-3xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider block">Wishlist items</span>
                <span className="text-xl font-bold text-theme-text">{wishlistCount} saved</span>
              </div>
            </div>

            {/* Cart Status */}
            <div className="bg-theme-card border border-theme-border rounded-3xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider block">Shopping bag</span>
                <span className="text-xl font-bold text-theme-text">{cartCount} items</span>
              </div>
            </div>

          </div>

          {/* Orders History */}
          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary" />
              Recent Orders
            </h3>
            
            <div className="text-xs text-theme-muted py-6 text-center leading-relaxed">
              No recent transactions recorded. Your catalog purchases will display here.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function WishlistPage({ wishlist, onAddToCart, onRemoveWishlist, setActivePage, setSelectedProduct }) {
  const handleViewDetails = (prod) => {
    setSelectedProduct(prod);
    setActivePage('details');
  };

  return (
    <div className="flex-grow px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12 text-left animate-fade-in">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text mb-8">
        My Curated Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-theme-card border border-theme-border rounded-3xl p-8 shadow-sm max-w-md mx-auto">
          <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center text-theme-muted mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-serif font-bold text-theme-text">Your wishlist is empty</h3>
          <p className="text-xs text-theme-muted mt-2">
            No clothing designs have been added to your wishlist yet.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="mt-6 px-6 py-2.5 bg-theme-text text-theme-bg text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((prod) => (
            <div key={prod.id} className="relative group">
              <ProductCard 
                product={prod}
                onViewDetails={() => handleViewDetails(prod)}
                onAddToCart={onAddToCart}
                onToggleWishlist={() => onRemoveWishlist(prod)}
                isWishlisted={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
