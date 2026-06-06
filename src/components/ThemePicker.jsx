import React, { useState } from 'react';
import { Palette, X, Check } from 'lucide-react';

export default function ThemePicker({ currentTheme, onChangeTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'warm-beige',
      name: 'Warm Beige',
      description: 'Default warm earthy aesthetic',
      colors: { bg: '#FAF9F6', primary: '#3b82f6', text: '#2c2520' }
    },
    {
      id: 'luxury-dark',
      name: 'Luxury Dark',
      description: 'Elegant night & gold style',
      colors: { bg: '#0d0d0d', primary: '#d4af37', text: '#f5f5f5' }
    },
    {
      id: 'emerald-velvet',
      name: 'Emerald Velvet',
      description: 'Deep royal green & brass',
      colors: { bg: '#061c14', primary: '#e5c158', text: '#f0fdf4' }
    },
    {
      id: 'rose-quartz',
      name: 'Rose Quartz',
      description: 'Romantic pastel rose tones',
      colors: { bg: '#fffbf9', primary: '#b07e7a', text: '#3d2c2b' }
    },
    {
      id: 'ocean-navy',
      name: 'Ocean Navy',
      description: 'Sophisticated deep blue & coral',
      colors: { bg: '#0b0f19', primary: '#ff8a65', text: '#f8fafc' }
    }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full border border-theme-border bg-theme-card text-theme-text shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
        aria-label="Customize Theme"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        {/* Glow indicator */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full ring-2 ring-theme-bg animate-pulse"></span>
      </button>

      {/* Slide-out Customizer Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-md animate-slide-in-left">
              <div className="h-full flex flex-col bg-theme-card border-r border-theme-border shadow-2xl overflow-y-scroll">
                
                {/* Header */}
                <div className="px-6 py-6 border-b border-theme-border flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-theme-text flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Visual Identity Customizer
                    </h2>
                    <p className="text-xs text-theme-muted mt-1">
                      Choose a theme suited for your fashion vibe.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-theme-bg text-theme-muted hover:text-theme-text transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Theme Options List */}
                <div className="flex-1 py-6 px-6 space-y-4">
                  {themes.map((theme) => {
                    const isSelected = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          onChangeTheme(theme.id);
                        }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group flex items-start justify-between cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-theme-border hover:border-theme-text/30 hover:bg-theme-bg/50'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-theme-text">
                              {theme.name}
                            </span>
                            {isSelected && (
                              <span className="flex items-center justify-center w-4 h-4 bg-primary text-white rounded-full">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-theme-muted mt-1">
                            {theme.description}
                          </p>
                          
                          {/* Color Palette Pill Previews */}
                          <div className="flex items-center gap-1.5 mt-3">
                            <span 
                              className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: theme.colors.bg }}
                              title="Background color"
                            />
                            <span 
                              className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: theme.colors.primary }}
                              title="Accent color"
                            />
                            <span 
                              className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: theme.colors.text }}
                              title="Text color"
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer note */}
                <div className="px-6 py-6 border-t border-theme-border bg-theme-bg/40 text-[11px] text-theme-muted text-center">
                  Theme switches modify global CSS styling rules in real-time.
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
