import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onViewDetails, 
  onAddToCart, 
  onToggleWishlist,
  isWishlisted = false
}) {
  const { id, name, category, price, rating, image, tag, inStock } = product;

  return (
    <div className="group flex flex-col bg-theme-card border border-theme-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-theme-text/10 transition-all duration-500">
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-theme-bg overflow-hidden cursor-pointer" onClick={() => onViewDetails(id)}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover zoom-effect"
          loading="lazy"
        />

        {/* Promo tag */}
        {tag && (
          <span className="absolute top-4 left-4 bg-theme-text text-theme-bg text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full z-10 shadow-sm">
            {tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full border shadow-md backdrop-blur-md transition-all duration-300 z-10 cursor-pointer ${
            isWishlisted 
              ? 'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 scale-105' 
              : 'bg-theme-card/85 border-theme-border text-theme-muted hover:text-red-500 hover:scale-105'
          }`}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add To Cart Overlay (Desktops) */}
        {inStock && (
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full py-3 bg-theme-text text-theme-bg text-xs font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Quick Add to Cart
            </button>
          </div>
        )}

        {/* Out of Stock banner overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Information Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold tracking-wider text-theme-muted uppercase">
            {category}
          </span>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(id)}
            className="text-sm font-medium text-theme-text mt-1 line-clamp-1 hover:text-primary cursor-pointer transition-colors"
            title={name}
          >
            {name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[11px] font-semibold text-theme-text">{rating}</span>
            <span className="text-[10px] text-theme-muted">(Review)</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-theme-border/60">
          <span className="text-base font-bold text-theme-text">
            ${price.toFixed(2)}
          </span>
          
          {/* Mobile shopping cart trigger */}
          {inStock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-2.5 bg-theme-bg border border-theme-border text-theme-text hover:bg-primary hover:border-primary hover:text-white rounded-full transition-all duration-300 md:hidden cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
