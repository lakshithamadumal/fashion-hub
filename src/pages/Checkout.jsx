import React, { useState } from 'react';
import { CreditCard, ShoppingBag, ShieldCheck, Truck, Sparkles, Loader2, ArrowRight } from 'lucide-react';

export default function Checkout({ cartItems, onClearCart, setActivePage }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    shippingMethod: 'standard'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = formData.shippingMethod === 'express' ? 25 : (subtotal > 150 ? 0 : (subtotal === 0 ? 0 : 15));
  const tax = subtotal * 0.08;
  const isPromoApplied = true; // Simulating applied state if needed, or static math:
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order placement processing
    setTimeout(() => {
      setLoading(false);
      setIsOrdered(true);
      setOrderNumber('FH-' + Math.floor(100000 + Math.random() * 900000));
      onClearCart();
    }, 1800);
  };

  // Success Confirmation State
  if (isOrdered) {
    // Delivery date calculation (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (formData.shippingMethod === 'express' ? 3 : 7));
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="flex-1 px-4 mx-auto max-w-xl py-16 text-center animate-fade-in select-text">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        
        <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-3 py-1 rounded-full">
          Transaction Completed
        </span>
        
        <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text mt-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-xs text-theme-muted mt-2">
          Thank you for choosing FashionHub. Your order has been registered and is being processed.
        </p>

        <div className="bg-theme-card border border-theme-border rounded-3xl p-6 mt-8 space-y-4 text-xs text-left shadow-sm">
          <div className="flex justify-between border-b border-theme-border/50 pb-3">
            <span className="text-theme-muted">Order Number</span>
            <span className="font-bold text-theme-text font-mono">{orderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-theme-border/50 pb-3">
            <span className="text-theme-muted">Recipient Name</span>
            <span className="font-semibold text-theme-text">{formData.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-theme-border/50 pb-3">
            <span className="text-theme-muted">Estimated Delivery</span>
            <span className="font-semibold text-theme-text text-green-600">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-theme-muted">Delivery Address</span>
            <span className="font-semibold text-theme-text text-right max-w-[200px] line-clamp-2">
              {formData.address}, {formData.city}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('home')}
          className="mt-10 px-8 py-3.5 bg-theme-text text-theme-bg text-xs font-semibold rounded-2xl hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Cart Empty State
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 px-4 mx-auto max-w-md py-20 text-center">
        <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center text-theme-muted mx-auto mb-6">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-theme-text">Your bag is empty</h2>
        <p className="text-xs text-theme-muted mt-2">
          There are no items in your shopping bag to checkout.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-6 px-6 py-2.5 bg-theme-text text-theme-bg text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Back Link */}
      <button 
        onClick={() => setActivePage('shop')}
        className="mb-8 flex items-center gap-1.5 text-xs font-bold text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
      >
        Continue Shopping
      </button>

      <h1 className="font-serif text-3xl font-bold tracking-tight text-theme-text mb-8">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Shipping & Payment forms (8 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          
          {/* Shipping Details */}
          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-theme-text uppercase tracking-wider mb-6 flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              1. Delivery Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Shipping Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Luxury Street, Flat 4B"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Colombo"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Postal / Zip Code</label>
                <input
                  type="text"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="00100"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mt-6 pt-6 border-t border-theme-border/60">
              <span className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-3">Delivery Option</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-theme-border'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="standard" 
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="accent-primary" 
                    />
                    <div>
                      <span className="text-xs font-semibold text-theme-text block">Standard Delivery</span>
                      <span className="text-[10px] text-theme-muted block">Est. Delivery in 5-7 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-theme-text">{subtotal > 150 ? 'Free' : '$15.00'}</span>
                </label>

                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-theme-border'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="express" 
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="accent-primary" 
                    />
                    <div>
                      <span className="text-xs font-semibold text-theme-text block">Express Delivery</span>
                      <span className="text-[10px] text-theme-muted block">Est. Delivery in 2-3 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-theme-text">$25.00</span>
                </label>
              </div>
            </div>

          </div>

          {/* Payment Details */}
          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-theme-text uppercase tracking-wider mb-6 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              2. Payment Information
            </h2>

            {/* Payment Method Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-theme-text bg-theme-bg' : 'border-theme-border text-theme-muted'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Credit/Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-theme-text bg-theme-bg' : 'border-theme-border text-theme-muted'
                }`}
              >
                Cash on Delivery
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Name on Card</label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Card Number</label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    placeholder="1234 5678 1234 5678"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Expiration Date</label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-theme-text uppercase tracking-wider mb-2">Security Code (CVV)</label>
                  <input
                    type="password"
                    required={paymentMethod === 'card'}
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="•••"
                    maxLength="3"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-theme-bg/50 border border-theme-border rounded-xl text-xs text-theme-muted leading-relaxed font-light animate-fade-in">
                Pay in cash upon physical receipt. Please make sure someone is available at your shipping address to settle the invoice amount when our courier partner arrives.
              </div>
            )}

          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sovereign Verification in progress...
              </>
            ) : (
              <>
                Confirm Order & Pay ${(total).toFixed(2)}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right Side: Order Summary (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-sm font-bold text-theme-text uppercase tracking-wider mb-6 pb-4 border-b border-theme-border">
              Order Summary
            </h2>

            {/* Product list preview */}
            <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-theme-bg rounded-lg overflow-hidden flex-shrink-0 border border-theme-border/60">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-theme-text block line-clamp-1">{item.name}</span>
                    <span className="text-theme-muted block mt-0.5 font-medium">
                      Qty: {item.quantity} | Size: {item.selectedSize}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-theme-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Checkout Pricing breakdowns */}
            <div className="border-t border-theme-border/60 pt-4 space-y-2.5 text-xs text-theme-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-theme-text">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-theme-text">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Est. Taxes (8%)</span>
                <span className="font-semibold text-theme-text">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-theme-text pt-4 border-t border-theme-border">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Secure payment disclaimer */}
            <div className="mt-6 p-4 bg-theme-bg/60 rounded-2xl flex items-center gap-3 border border-theme-border/50 text-[10px] text-theme-muted leading-relaxed font-light">
              <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
              Your security is paramount. Your transaction details are encrypted using 256-bit SSL protocols. We do not store full credit card data.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
