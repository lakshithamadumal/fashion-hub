import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0, 
  activePage = 'home', 
  setActivePage,
  onSearch,
  openCartDrawer,
  openWishlistPage,
  transparent = false
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchText);
      setActivePage('shop');
    }
  };

  return (
    <nav className={`z-40 w-full transition-all duration-300 ${
      transparent 
        ? 'absolute top-0 left-0 bg-transparent border-none' 
        : 'sticky top-0 border-b border-theme-border bg-theme-bg/85 backdrop-blur-md'
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}>
            <span className={`block font-serif text-2xl font-bold tracking-tight leading-none ${
              transparent ? 'text-white' : 'text-theme-text'
            }`}>
              FashionHub
            </span>
            <span className={`block text-[8px] font-sans font-bold tracking-[0.25em] uppercase mt-0.5 ${
              transparent ? 'text-white/60' : 'text-theme-muted'
            }`}>
              Catch the Style
            </span>
          </div>

          {/* Desktop Navigation (Exactly: Home, Shop, Categories, Contact) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <button
              onClick={() => { setActivePage('home'); setCategoriesDropdownOpen(false); }}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                activePage === 'home'
                  ? (transparent ? 'bg-white/15 text-white' : 'bg-theme-text/10 text-theme-text')
                  : (transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5')
              }`}
            >
              Home
            </button>

            <button
              onClick={() => { setActivePage('shop'); setCategoriesDropdownOpen(false); }}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                activePage === 'shop' && !categoriesDropdownOpen
                  ? (transparent ? 'bg-white/15 text-white' : 'bg-theme-text/10 text-theme-text')
                  : (transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5')
              }`}
            >
              Shop
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  categoriesDropdownOpen
                    ? (transparent ? 'bg-white/15 text-white' : 'bg-theme-text/10 text-theme-text')
                    : (transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5')
                }`}
              >
                Categories
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {categoriesDropdownOpen && (
                <div className="absolute left-0 w-48 mt-2 origin-top-left rounded-2xl shadow-xl bg-theme-card border border-theme-border py-2 z-50 animate-fade-in">
                  {['Women', 'Men', 'Accessories', 'Shoes'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        if (onSearch) onSearch('', cat);
                        setActivePage('shop');
                        setCategoriesDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2.5 text-xs text-theme-text hover:bg-theme-bg transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { setActivePage('contact'); setCategoriesDropdownOpen(false); }}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                activePage === 'contact'
                  ? (transparent ? 'bg-white/15 text-white' : 'bg-theme-text/10 text-theme-text')
                  : (transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5')
              }`}
            >
              Contact
            </button>
          </div>

          {/* Search bar matching style */}
          <div className="hidden lg:block flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for Products..."
                className={`w-full h-10 pl-4 pr-10 text-xs rounded-full border transition-all duration-300 focus:outline-none focus:ring-1 ${
                  transparent 
                    ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:ring-white/40 focus:border-white/40' 
                    : 'bg-theme-card/30 border-theme-border text-theme-text placeholder-theme-muted/70 focus:ring-primary focus:border-primary'
                }`}
              />
              <button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                transparent ? 'text-white/60 hover:text-white' : 'text-theme-muted hover:text-theme-text'
              }`}>
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button 
              onClick={() => setActivePage('profile')} 
              className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5'
              }`}
              title="Account"
            >
              <User className="w-4.5 h-4.5" />
            </button>
            
            {/* Wishlist Button with badge */}
            <button 
              onClick={openWishlistPage} 
              className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5'
              }`}
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-[#3b82f6] rounded-full ring-2 ring-black/40 shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                {wishlistCount}
              </span>
            </button>

            {/* Cart Button with badge */}
            <button 
              onClick={openCartDrawer}
              className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5'
              }`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-[#3b82f6] rounded-full ring-2 ring-black/40 shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-full md:hidden transition-all duration-300 cursor-pointer ${
                transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-theme-muted hover:text-theme-text hover:bg-theme-text/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in bg-theme-card border-b border-theme-border">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {['home', 'shop', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setActivePage(page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activePage === page
                    ? 'bg-theme-text/10 text-theme-text font-bold'
                    : 'text-theme-muted hover:bg-theme-bg hover:text-theme-text'
                }`}
              >
                {page}
              </button>
            ))}
            
            {/* Mobile Categories list */}
            <div className="border-t border-theme-border mt-2 pt-2">
              <span className="px-4 py-1 text-[10px] font-bold text-theme-muted uppercase tracking-wider block">
                Categories
              </span>
              {['Women', 'Men', 'Accessories', 'Shoes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (onSearch) onSearch('', cat);
                    setActivePage('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-6 py-2 text-xs text-theme-text hover:bg-theme-bg transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
