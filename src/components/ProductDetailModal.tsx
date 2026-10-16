import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Truck, Sparkles, AlertTriangle, Ruler, Send } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const ProductDetailModal: React.FC = () => {
  const { products, selectedProductId, setSelectedProductId, addToCart, setIsCartOpen, setIsSizeGuideOpen } = useFashion();

  const product = products.find(p => p.id === selectedProductId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Sync state whenever product opens
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      // Pick first size with stock > 0, or first size
      const firstAvailable = product.sizes.find(s => s.stock > 0) || product.sizes[0];
      setSelectedSize(firstAvailable ? firstAvailable.size : '');
      setSelectedColor(product.colors[0]?.name || 'Standard');
    }
  }, [product]);

  if (!product) return null;

  const currentSizeObj = product.sizes.find(s => s.size === selectedSize);
  const currentStock = currentSizeObj ? currentSizeObj.stock : 0;
  const isSelectedOutOfStock = currentStock <= 0;
  const totalStockAcrossSizes = product.sizes.reduce((sum, s) => sum + s.stock, 0);

  const handleAddToCart = (openBag = false) => {
    if (isSelectedOutOfStock || quantity <= 0) return;

    addToCart({
      productId: product.id,
      title: product.title,
      priceBirr: product.priceBirr,
      selectedSize,
      selectedColor,
      quantity,
      image: product.images[activeImageIndex] || product.images[0]
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);

    if (openBag) {
      setSelectedProductId(null);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-200 flex flex-col my-auto max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductId(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 shadow-sm transition-all focus:outline-none"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: Image Gallery (md:col-span-6 or 7) */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col p-4 sm:p-6 border-b md:border-b-0 md:border-r border-stone-200">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-stone-900 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Addis Atelier Trust Note */}
            <div className="mt-auto pt-6 text-xs text-stone-500 space-y-2 border-t border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-700">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Express courier across Addis Ababa (Same-day for Bole, Kazanchis, Sarbet)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Complimentary custom tailoring fit check at our Bole showroom</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module & Comprehensive Details (md:col-span-6) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
                <span>{product.category}</span>
                <span aria-hidden="true">/</span>
                <span>{product.collection}</span>
                <span aria-hidden="true">/</span>
                <span className="text-stone-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2 leading-tight">
                {product.title}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-stone-950 tabular-nums">
                  {product.priceBirr.toLocaleString()} Birr
                </span>
                {product.originalPriceBirr && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    {product.originalPriceBirr.toLocaleString()} Birr
                  </span>
                )}
                <span className="text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-medium">
                  VAT Included
                </span>
              </div>

              {/* Real-time Stock Overview */}
              <div className="mt-4 p-3 bg-stone-50 rounded-md border border-stone-200">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-stone-700">Bole Flagship Inventory:</span>
                  {totalStockAcrossSizes > 0 ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      In Stock ({totalStockAcrossSizes} units total)
                    </span>
                  ) : (
                    <span className="text-rose-700 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Out of Stock (Atelier Made-to-Order)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-stone-600 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Interactive Variant Selectors */}
              <div className="mt-6 space-y-4 pt-4 border-t border-stone-100">
                {/* Size Selector with real-time stock indicators */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-stone-900 uppercase tracking-wider">
                        Select Size:
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-stone-500 hover:text-stone-900 underline flex items-center gap-1 text-[11px]"
                      >
                        <Ruler className="w-3 h-3 text-amber-700" />
                        <span>Size & Fitting Guide</span>
                      </button>
                    </div>
                    <span className="text-stone-500 font-mono text-[11px]">
                      {currentSizeObj ? (
                        currentStock > 0 ? (
                          <span className={currentStock <= 2 ? 'text-amber-700 font-bold' : 'text-stone-700'}>
                            {currentStock} unit{currentStock > 1 ? 's' : ''} available in Addis
                          </span>
                        ) : (
                          <span className="text-rose-600 font-medium">Size {selectedSize} Out of Stock</span>
                        )
                      ) : null}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => {
                      const isSelected = selectedSize === s.size;
                      const isOutOfStock = s.stock <= 0;

                      return (
                        <button
                          key={s.size}
                          onClick={() => {
                            setSelectedSize(s.size);
                            if (quantity > s.stock) setQuantity(Math.max(1, s.stock));
                          }}
                          className={`min-w-12 px-3 py-2 text-xs font-medium rounded border transition-all flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : isOutOfStock
                              ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed line-through'
                              : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                          }`}
                        >
                          <span className="font-bold">{s.size}</span>
                          <span className="text-[10px] font-mono opacity-80">
                            {s.stock > 0 ? `${s.stock} left` : '0'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                      Color / Fabric Finish: <span className="font-normal text-stone-600">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-all ${
                            selectedColor === color.name
                              ? 'border-stone-900 bg-stone-100 font-medium text-stone-900'
                              : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-stone-300 rounded bg-white">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isSelectedOutOfStock}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-mono font-bold text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(currentStock, q + 1))}
                      disabled={quantity >= currentStock || isSelectedOutOfStock}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  {currentStock > 0 && quantity >= currentStock && (
                    <span className="text-[11px] text-amber-800 font-mono">Max stock reached</span>
                  )}
                </div>
              </div>

              {/* Comprehensive Details Accordion / Tabs */}
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Atelier Craftsmanship & Highlights
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {product.fabricCare && product.fabricCare.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                      Fabric & Garment Care
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
                      {product.fabricCare.map((care, idx) => (
                        <li key={idx}>{care}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions - Contiguous Purchase Module */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              {addedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded flex items-center justify-between animate-in fade-in">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Added to your Order Request Bag!
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProductId(null);
                      setIsCartOpen(true);
                    }}
                    className="font-semibold underline"
                  >
                    View Bag & Send Request &rarr;
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={isSelectedOutOfStock}
                  className="w-full py-3 px-4 rounded-md font-semibold text-xs tracking-wider uppercase border border-stone-900 text-stone-900 hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Bag</span>
                </button>

                <button
                  onClick={() => handleAddToCart(true)}
                  disabled={isSelectedOutOfStock}
                  className="w-full py-3 px-4 rounded-md font-semibold text-xs tracking-wider uppercase bg-stone-900 text-white hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Express Order Request</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>

              {/* Direct Telegram Concierge Link for Addis Customers */}
              <a
                href={`https://t.me/viavafashion_addis?text=${encodeURIComponent(
                  `Hello Viava Fashion Bole Boutique! I am inquiring about "${product.title}" (Size: ${selectedSize}, Price: ${product.priceBirr.toLocaleString()} Birr). Can I schedule a private fitting at your showroom?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-[#229ED9] hover:text-[#1b81b2] rounded-md text-xs font-semibold flex items-center justify-center gap-2 border border-stone-200 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>Instant Inquire on Telegram (@viavafashion_addis)</span>
              </a>

              <p className="text-[11px] text-stone-400 text-center">
                Submitting an order request reserves your size in our Addis boutique without immediate prepayment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
