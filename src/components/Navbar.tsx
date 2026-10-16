import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Menu, X, ShieldCheck } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, activeView, setActiveView, orders, setIsPitchModalOpen } = useFashion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'New').length;

  const handleNav = (view: 'storefront' | 'lookbook' | 'boutique' | 'admin' | 'contact') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Top micro-announcement */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center tracking-wide font-sans flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span>Bole Medhanialem Flagship Atelier, Addis Ababa</span>
        <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
        <span>Same-day Addis Delivery</span>
        <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
        <span className="text-amber-300 font-medium">All Prices in Birr (ETB)</span>
        <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
        <button
          onClick={() => setIsPitchModalOpen(true)}
          className="text-amber-300 hover:text-white underline underline-offset-2 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>✨ Owner Pitch: See Sales Growth & ROI</span>
        </button>
      </div>

      {/* Main Top Bar Contract: Brand Zone | Nav Links | Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('storefront')}
          className="text-left group flex items-baseline gap-2 whitespace-nowrap shrink-0 focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-stone-900 group-hover:text-amber-800 transition-colors">
            VIAVA
          </span>
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-stone-500 font-medium">
            Addis Ababa
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNav('storefront')}
            className={`whitespace-nowrap transition-colors hover:text-stone-900 py-1 ${
              activeView === 'storefront' ? 'text-stone-950 font-semibold border-b-2 border-stone-900' : ''
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => handleNav('lookbook')}
            className={`whitespace-nowrap transition-colors hover:text-stone-900 py-1 ${
              activeView === 'lookbook' ? 'text-stone-950 font-semibold border-b-2 border-stone-900' : ''
            }`}
          >
            Editorial Lookbook
          </button>
          <button
            onClick={() => handleNav('boutique')}
            className={`whitespace-nowrap transition-colors hover:text-stone-900 py-1 ${
              activeView === 'boutique' ? 'text-stone-950 font-semibold border-b-2 border-stone-900' : ''
            }`}
          >
            Boutique & Atelier
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`whitespace-nowrap transition-colors hover:text-stone-900 py-1 ${
              activeView === 'contact' ? 'text-stone-950 font-semibold border-b-2 border-stone-900' : ''
            }`}
          >
            Contact & Fittings
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Admin switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin CMS Access Button */}
          <button
            onClick={() => handleNav(activeView === 'admin' ? 'storefront' : 'admin')}
            className={`relative hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap ${
              activeView === 'admin'
                ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-sm'
                : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200 hover:text-stone-900'
            }`}
            title="Manage boutique inventory, update products, and view customer order requests"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
            {pendingOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" title={`${pendingOrdersCount} new order requests`} />
            )}
          </button>

          {/* Cart / Order Request Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-all whitespace-nowrap shadow-sm hover:shadow active:scale-95"
            aria-label="View Order Request Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Bag</span>
            <span className="font-mono text-xs bg-stone-700 px-1.5 py-0.2 rounded text-stone-100 tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium">
            <button
              onClick={() => handleNav('storefront')}
              className={`text-left py-2 px-2 rounded-md ${
                activeView === 'storefront' ? 'bg-stone-200 font-semibold' : 'text-stone-700'
              }`}
            >
              Collections & Shop
            </button>
            <button
              onClick={() => handleNav('lookbook')}
              className={`text-left py-2 px-2 rounded-md ${
                activeView === 'lookbook' ? 'bg-stone-200 font-semibold' : 'text-stone-700'
              }`}
            >
              Editorial Lookbook
            </button>
            <button
              onClick={() => handleNav('boutique')}
              className={`text-left py-2 px-2 rounded-md ${
                activeView === 'boutique' ? 'bg-stone-200 font-semibold' : 'text-stone-700'
              }`}
            >
              Boutique & Atelier
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left py-2 px-2 rounded-md ${
                activeView === 'contact' ? 'bg-stone-200 font-semibold' : 'text-stone-700'
              }`}
            >
              Contact & Appointments
            </button>
            <button
              onClick={() => handleNav('admin')}
              className={`text-left py-2.5 px-3 rounded-md flex items-center justify-between border ${
                activeView === 'admin'
                  ? 'bg-amber-900 text-white border-amber-900'
                  : 'bg-stone-100 text-stone-900 border-stone-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Admin CMS & Inventory</span>
              </span>
              {pendingOrdersCount > 0 && (
                <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full font-mono">
                  {pendingOrdersCount} new
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
