import React from 'react';
import { ShieldCheck, ArrowUpRight, MapPin, Heart } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useFashion();

  const handleNav = (view: 'storefront' | 'lookbook' | 'boutique' | 'admin' | 'contact') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-sans border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold tracking-widest text-white">
                VIAVA
              </span>
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-amber-400 font-medium">
                Addis Ababa
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Modern Ethiopian haute couture and luxury ready-to-wear. Designed and hand-tailored in our Bole Medhanialem atelier, preserving ancestral artisan weaving techniques through contemporary architectural silhouettes.
            </p>
            <div className="text-xs text-stone-500 font-mono space-y-1">
              <div>Bole Sub-City, Cameroon St, Addis Ababa, Ethiopia</div>
              <div>Hotline: +251 911 234 567 · concierge@viavafashion.et</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Explore Atelier
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('storefront')}
                  className="hover:text-white transition-colors"
                >
                  Current Collections (Birr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('lookbook')}
                  className="hover:text-white transition-colors"
                >
                  Editorial Lookbook & Runway
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('boutique')}
                  className="hover:text-white transition-colors"
                >
                  Bole Showroom & Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Custom Fitting Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Payment in Addis Ababa */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Addis Delivery & Payments
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Same-day courier delivery available across all sub-cities of Addis Ababa. Customers pay upon delivery via Telebirr, Commercial Bank of Ethiopia (CBE Birr), or cash.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleNav('admin')}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-850 text-amber-300 border border-stone-800 rounded text-xs font-semibold transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Store Administrator & CMS Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Row */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Viava Fashion Plc. Addis Ababa, Ethiopia. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Prices listed in Ethiopian Birr (ETB)</span>
            <span aria-hidden="true">·</span>
            <span>Handmade with pride in Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
