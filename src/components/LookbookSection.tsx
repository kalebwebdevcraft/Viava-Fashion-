import React, { useState } from 'react';
import { Sparkles, Maximize2, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useFashion } from '../context/FashionContext';
import { LookbookItem } from '../types';
import { FASHION_IMAGES } from '../assets/images';

export const LookbookSection: React.FC = () => {
  const { lookbook, setSelectedProductId } = useFashion();
  const [activeTag, setActiveTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<LookbookItem | null>(null);

  const tags = ['All', 'Studio Editorial', 'Runway', 'Addis Streetwear', 'Atelier Craft'];

  const filteredLooks = lookbook.filter(
    item => activeTag === 'All' || item.tag === activeTag
  );

  const handleShopLook = (productId?: string) => {
    if (productId) {
      setActiveItem(null);
      setSelectedProductId(productId);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Editorial Gallery & Campaign Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The Addis Ababa Lookbook
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Visual narratives captured in the highlands of Addis Ababa. Click any frame to inspect tailoring craftsmanship or shop the exact garment.
            </p>
          </div>

          {/* Tag Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTag === tag
                    ? 'bg-amber-300 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {filteredLooks.map((item, index) => {
            const isWide = index === 0 || index === 4;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group cursor-pointer relative rounded-md overflow-hidden bg-stone-950 border border-stone-800 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isWide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className={`relative ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'} overflow-hidden`}>
                  <img
                    src={item.image || FASHION_IMAGES.lifestyle}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FASHION_IMAGES.lifestyle;
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top tag */}
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-stone-700">
                    {item.tag}
                  </div>

                  <div className="absolute top-3 right-3 p-2 bg-stone-900/80 rounded-full text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Caption & Actions at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end space-y-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    {item.linkedProductId && (
                      <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-300 font-semibold group-hover:underline">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop This Look in Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-700 rounded-lg overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white bg-stone-800/80 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] bg-black">
              <img
                src={activeItem.image || FASHION_IMAGES.lifestyle}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FASHION_IMAGES.lifestyle;
                }}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  {activeItem.tag}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                  {activeItem.caption}
                </p>
              </div>

              {activeItem.linkedProductId && (
                <button
                  onClick={() => handleShopLook(activeItem.linkedProductId)}
                  className="px-5 py-2.5 bg-amber-300 hover:bg-amber-200 text-stone-950 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Exact Garment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
