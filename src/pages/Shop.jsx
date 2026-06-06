import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Star, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function Shop({ 
  searchQuery = '', 
  setSearchQuery,
  selectedCategory = 'All',
  setSelectedCategory,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  setSelectedProduct,
  setActivePage
}) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice, setMaxPrice] = useState(350);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Available filters based on actual products database
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '8', '9', '10', '11', '12', 'One Size'];
  const allColors = [
    { name: 'Cream', hex: '#FAF9F6' },
    { name: 'Dusty Rose', hex: '#c29c92' },
    { name: 'Sage Green', hex: '#87a987' },
    { name: 'Beige', hex: '#e5d3b3' },
    { name: 'Navy Blue', hex: '#1e293b' },
    { name: 'Gold', hex: '#d4af37' },
    { name: 'Tan', hex: '#a67c52' },
    { name: 'Dark Brown', hex: '#5c4033' },
    { name: 'Black', hex: '#000000' }
  ];

  const handleToggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColor('');
    setMaxPrice(350);
    setMinRating(0);
    setSearchQuery('');
  };

  // Memoized filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sizes filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColor) {
      result = result.filter(p => 
        p.colors.some(c => c.name === selectedColor)
      );
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSizes, selectedColor, maxPrice, minRating, sortBy]);

  const handleViewDetails = (id) => {
    const prod = PRODUCTS.find(p => p.id === id);
    setSelectedProduct(prod);
    setActivePage('details');
  };

  return (
    <div className="flex-1 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-left border-b border-theme-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text my-0">
            {selectedCategory === 'All' ? 'Explore Shop' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Displaying {filteredProducts.length} of {PRODUCTS.length} premium pieces.
          </p>
        </div>

        {/* Sort and Filters Trigger Row */}
        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center border border-theme-border rounded-2xl bg-theme-card px-3 py-2 text-xs font-semibold text-theme-text shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-theme-muted mr-2" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Options</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center border border-theme-border rounded-2xl bg-theme-card px-3.5 py-2 text-xs font-semibold text-theme-text shadow-sm hover:bg-theme-bg cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-theme-muted mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        
        {/* ================= DESKTOP FILTER SIDEBAR ================= */}
        <aside className="hidden lg:block w-64 flex-shrink-0 bg-theme-card border border-theme-border p-6 rounded-3xl shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-theme-border mb-6">
            <h3 className="text-sm font-bold text-theme-text uppercase tracking-wider">Filters</h3>
            <button 
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Category</h4>
            <div className="space-y-1.5 text-xs text-theme-muted font-medium">
              {['All', 'Women', 'Men', 'Accessories', 'Shoes'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left py-1 hover:text-theme-text transition-colors cursor-pointer ${
                    selectedCategory === cat ? 'text-primary font-bold' : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider">Max Price</h4>
              <span className="text-xs font-bold text-theme-text">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-theme-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[9px] text-theme-muted mt-2">
              <span>$50</span>
              <span>$350</span>
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
            <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Sizes</h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map(size => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleToggleSize(size)}
                    className={`h-8 min-w-8 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
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

          {/* Colors Filter */}
          <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
            <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Colors</h4>
            <div className="flex flex-wrap gap-2">
              {allColors.map(color => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(isSelected ? '' : color.name)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-theme-bg' : 'border-black/10'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="pb-2 border-t border-theme-border/60 pt-5">
            <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Minimum Rating</h4>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`p-1 hover:text-yellow-500 transition-colors cursor-pointer ${
                    rating <= minRating ? 'text-yellow-500' : 'text-theme-border'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-theme-card border border-theme-border rounded-3xl p-8 shadow-sm">
              <h3 className="text-base font-serif font-bold text-theme-text">No products match your filters</h3>
              <p className="text-xs text-theme-muted mt-2">
                Try resetting or adjusting filters, or typing another keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 bg-theme-text text-theme-bg text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
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
          )}
        </div>

      </div>

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs animate-slide-in-right">
              <div className="h-full flex flex-col bg-theme-card shadow-2xl border-l border-theme-border p-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-theme-border mb-6">
                  <h3 className="text-sm font-bold text-theme-text uppercase tracking-wider">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 rounded-full hover:bg-theme-bg text-theme-muted hover:text-theme-text"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Women', 'Men', 'Accessories', 'Shoes'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-primary border-primary text-white font-bold'
                            : 'border-theme-border text-theme-muted hover:border-theme-text'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider">Max Price</h4>
                    <span className="text-xs font-bold text-theme-text">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="350"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-theme-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Sizes Filter */}
                <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
                  <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {allSizes.map(size => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => handleToggleSize(size)}
                          className={`h-8 min-w-8 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-theme-text border-theme-text text-theme-bg'
                              : 'border-theme-border text-theme-muted hover:border-theme-text'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Colors Filter */}
                <div className="mb-6 pb-6 border-t border-theme-border/60 pt-5">
                  <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider mb-3">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map(color => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(isSelected ? '' : color.name)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-theme-bg' : 'border-black/10'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset button */}
                <button
                  onClick={() => {
                    handleResetFilters();
                    setShowMobileFilters(false);
                  }}
                  className="w-full mt-auto py-3 bg-theme-bg border border-theme-border text-theme-text text-xs font-semibold rounded-2xl hover:bg-theme-text hover:text-theme-bg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
