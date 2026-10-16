import React from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const Hero: React.FC = () => {
  const { setActiveView } = useFashion();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Unboxed subtle kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Addis Ababa Haute Couture & Pret-à-Porter</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Where Ancient Craft Meets Modern Addis Luxury.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans max-w-xl">
              Elevated ready-to-wear and bespoke couture tailored in our Bole atelier.
              From sculptural handwoven Tibeb gowns to razor-sharp wool power suits,
              experience contemporary Ethiopian fashion priced transparently in Birr.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-950 bg-amber-300 hover:bg-amber-200 rounded-md transition-all flex items-center gap-2.5 shadow-md active:scale-95"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveView('lookbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-sm font-medium tracking-wide text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 rounded-md transition-colors"
              >
                View Editorial Lookbook
              </button>
            </div>

            {/* Adjacency Trust Badges (clean unboxed text with subtle separators) */}
            <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Handmade in Ethiopia</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bole Medhanialem Boutique</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Telebirr & CBE Birr Accepted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-stone-800 bg-stone-950">
              <img
                src="/src/assets/images/hero_viava_fashion_1792167759332.jpg"
                alt="Viava Fashion modern high-fashion collection in Addis Ababa"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Floating Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-stone-900/90 backdrop-blur-md p-4 rounded-md border border-stone-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono tracking-widest uppercase text-amber-300">
                    Addis Haute 2026 Collection
                  </div>
                  <div className="font-serif text-white font-medium text-sm sm:text-base">
                    Architectural Wrap Coat & Habesha Silk
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-400">Priced from</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300 font-mono tabular-nums">
                    7,950 Birr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
