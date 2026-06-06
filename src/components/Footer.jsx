import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-theme-card border-t border-theme-border mt-auto">
      
      {/* Newsletter Section */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 border-b border-theme-border/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="font-serif text-xl font-bold text-theme-text">Join the Club</h3>
            <p className="text-xs text-theme-muted mt-1">
              Subscribe to get exclusive offers, style updates, and first access to new season collections.
            </p>
          </div>
          <div className="w-full max-w-sm">
            {subscribed ? (
              <div className="text-xs font-semibold text-green-600 bg-green-500/5 border border-green-500/20 px-4 py-3.5 rounded-2xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Thank you! You have been successfully subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-xs rounded-2xl border border-theme-border bg-theme-bg text-theme-text placeholder-theme-muted/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-theme-text text-theme-bg text-xs font-semibold rounded-2xl hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Logo & Brand statement */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-lg font-bold text-theme-text block leading-none">
              FashionHub
            </span>
            <span className="text-[7px] font-sans font-bold tracking-[0.25em] text-theme-muted uppercase mt-0.5 block">
              Catch the Style
            </span>
            <p className="text-xs text-theme-muted mt-4 max-w-xs leading-relaxed">
              Elegant and premium clothing designed to elevate your modern lifestyle trends. Handcrafted details for daily comfort.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'shop', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setActivePage(page)}
                    className="text-theme-muted hover:text-theme-text capitalize transition-colors cursor-pointer"
                  >
                    {page} Page
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-theme-muted">
              {['Women\'s Wear', 'Men\'s Wear', 'Accessories', 'Loafers & Boots'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setActivePage('shop')}
                    className="hover:text-theme-text transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Matching Hero Overlay */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
              Support Details
            </h4>
            <ul className="space-y-3 text-xs text-theme-muted">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-theme-muted" />
                <a href="tel:+94771234567" className="hover:text-theme-text transition-colors">
                  +94 77 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-theme-muted" />
                <a href="mailto:support@fashionhub.com" className="hover:text-theme-text transition-colors">
                  support@fashionhub.com
                </a>
              </li>
              <li className="flex items-center gap-2 mt-4 pt-4 border-t border-theme-border/60">
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-theme-bg rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-border/40 transition-colors" title="Instagram">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-theme-bg rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-border/40 transition-colors" title="Facebook">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-theme-bg rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-border/40 transition-colors" title="Twitter / X">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Footer & Payments */}
        <div className="border-t border-theme-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-theme-muted">
          <span>
            &copy; {new Date().getFullYear()} FashionHub. All rights reserved. Created in Sri Lanka.
          </span>
          
          {/* Simulated Payment Badges */}
          <div className="flex items-center gap-2 font-semibold">
            <span className="px-2 py-1 bg-theme-bg border border-theme-border rounded">VISA</span>
            <span className="px-2 py-1 bg-theme-bg border border-theme-border rounded">Mastercard</span>
            <span className="px-2 py-1 bg-theme-bg border border-theme-border rounded">AMEX</span>
            <span className="px-2 py-1 bg-theme-bg border border-theme-border rounded">PayPal</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
