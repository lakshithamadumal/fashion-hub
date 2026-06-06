import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem,
  onProceedCheckout 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : (subtotal === 0 ? 0 : 15);
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping + tax - promoDiscount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'STYLE10') {
      setPromoApplied(true);
      setPromoCode('');
    } else {
      alert('Invalid code! Try "STYLE10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md animate-slide-in-right">
          <div className="h-full flex flex-col bg-theme-card shadow-2xl border-l border-theme-border">
            
            {/* Header */}
            <div className="px-6 py-6 border-b border-theme-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-serif font-bold text-theme-text">Shopping Bag</h2>
                <span className="text-xs bg-theme-bg text-theme-text px-2.5 py-0.5 rounded-full font-semibold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-theme-bg text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center text-theme-muted mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-theme-text">Your bag is empty</h3>
                  <p className="text-xs text-theme-muted mt-2 max-w-xs">
                    Browse our premium collections to elevate your fashion style today.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-theme-text text-theme-bg text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex items-start gap-4 p-3 border border-theme-border/60 rounded-2xl bg-theme-card">
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-theme-bg flex-shrink-0 border border-theme-border/55">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between h-24 py-0.5">
                      <div>
                        <h4 className="text-xs font-medium text-theme-text line-clamp-1">{item.name}</h4>
                        <div className="flex flex-wrap gap-2 text-[10px] text-theme-muted mt-1.5 font-semibold">
                          <span>Size: {item.selectedSize}</span>
                          <span className="flex items-center gap-1">
                            Color: 
                            <span 
                              className="inline-block w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-theme-border rounded-full bg-theme-bg px-1">
                          <button
                            onClick={() => onUpdateQty(item, item.quantity - 1)}
                            className="p-1 hover:text-primary rounded-full cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-theme-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item, item.quantity + 1)}
                            className="p-1 hover:text-primary rounded-full cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-theme-text">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item)}
                            className="p-1.5 text-theme-muted hover:text-red-500 rounded-full hover:bg-red-500/5 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-theme-border py-6 px-4 sm:px-6 bg-theme-bg/30">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (e.g. STYLE10)"
                    disabled={promoApplied}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-theme-border bg-theme-card text-theme-text focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-4 py-2 bg-theme-text text-theme-bg text-xs font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-green-600 bg-green-500/5 border border-green-500/20 px-3 py-2 rounded-xl mb-4">
                    <span>Promo Applied: 10% Discount</span>
                    <button 
                      type="button" 
                      onClick={() => setPromoApplied(false)}
                      className="font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotal, Shipping, Tax, Total */}
                <div className="space-y-2.5 text-xs text-theme-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-theme-text">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount (10%)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-theme-text">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Taxes (8%)</span>
                    <span className="font-semibold text-theme-text">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-theme-text pt-2.5 border-t border-theme-border/60">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping prompt */}
                {subtotal < 150 && (
                  <p className="text-[10px] text-center text-theme-muted mt-3 font-medium">
                    Add <span className="font-bold text-theme-text">${(150 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                )}

                {/* Checkout Button */}
                <button
                  onClick={onProceedCheckout}
                  className="w-full mt-5 py-4 bg-primary text-white text-xs font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
