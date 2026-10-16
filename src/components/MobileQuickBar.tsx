import React from 'react';
import { ShoppingBag, Grid, Phone, ShieldCheck, Send } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const MobileQuickBar: React.FC = () => {
  const { cartCount, setIsCartOpen, activeView, setActiveView } = useFashion();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => {
          setActiveView('storefront');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeView === 'storefront' ? 'text-stone-950 font-bold' : 'text-stone-500'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>Garments</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium relative text-stone-900"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <span>Order Bag</span>
      </button>

      <a
        href="https://t.me/viavafashion_addis"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#229ED9]"
      >
        <Send className="w-4 h-4" />
        <span>Telegram</span>
      </a>

      <a
        href="tel:+251911234567"
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-stone-700"
      >
        <Phone className="w-4 h-4" />
        <span>Call Bole</span>
      </a>

      <button
        onClick={() => {
          setActiveView(activeView === 'admin' ? 'storefront' : 'admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
          activeView === 'admin' ? 'text-amber-800 font-bold' : 'text-stone-500'
        }`}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>CMS</span>
      </button>
    </div>
  );
};
