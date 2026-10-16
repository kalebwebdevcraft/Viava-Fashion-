import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Check, AlertCircle } from 'lucide-react';
import { useFashion } from '../context/FashionContext';
import { Product, ProductCategory } from '../types';

const CATEGORIES: Array<'All' | ProductCategory> = [
  'All',
  'Contemporary Habesha',
  'Tailored Suits',
  'Dresses & Gowns',
  'Urban Streetwear',
  'Silk & Linens',
  'Accessories & Bags'
];

export const ProductCatalog: React.FC = () => {
  const { products, setSelectedProductId, addToCart, setIsCartOpen } = useFashion();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'stock'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.collection.toLowerCase().includes(searchQuery.toLowerCase());
        const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
        const matchesStock = !inStockOnly || totalStock > 0;

        return matchesCategory && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceBirr - b.priceBirr;
        if (sortBy === 'price-desc') return b.priceBirr - a.priceBirr;
        if (sortBy === 'stock') {
          const stockA = a.sizes.reduce((acc, s) => acc + s.stock, 0);
          const stockB = b.sizes.reduce((acc, s) => acc + s.stock, 0);
          return stockB - stockA;
        }
        // Default: featured first, then newest
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // Pick the first available size
    const availableSize = product.sizes.find(s => s.stock > 0) || product.sizes[0];
    if (!availableSize || availableSize.stock <= 0) {
      setSelectedProductId(product.id);
      return;
    }

    addToCart({
      productId: product.id,
      title: product.title,
      priceBirr: product.priceBirr,
      selectedSize: availableSize.size,
      selectedColor: product.colors[0]?.name || 'Standard',
      quantity: 1,
      image: product.images[0]
    });

    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1500);
  };

  return (
    <section id="catalog-section" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-800 font-semibold mb-1">
            Current Collections · Addis Ababa
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Curated Garments & Atelier Pieces
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Select items to customize your order request. Real-time boutique stock updated live from our Bole showroom.
          </p>
        </div>

        {/* Currency & Delivery note */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-md p-3 text-xs text-amber-950 flex items-center gap-3">
          <div className="font-mono font-bold text-amber-900 text-sm">ETB (Birr)</div>
          <div className="text-stone-700">
            Payment on Delivery via <span className="font-medium text-stone-900">Telebirr, CBE Birr</span>, or Cash.
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 space-y-4">
        {/* Category Tabs (Horizontal Scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and In-Stock controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by garment, fabric, or collection..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none px-2.5 py-1.5 rounded-md hover:bg-stone-100 border border-stone-200">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-0 cursor-pointer"
              />
              <span className="whitespace-nowrap">In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              >
                <option value="featured">Featured Atelier Picks</option>
                <option value="price-asc">Price: Low to High (Birr)</option>
                <option value="price-desc">Price: High to Low (Birr)</option>
                <option value="stock">Highest Boutique Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & active filters */}
      <div className="mt-4 flex items-center justify-between text-xs text-stone-500 font-sans">
        <div>
          Showing <span className="font-semibold text-stone-800">{filteredProducts.length}</span> pieces
          {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
        </div>
        {(searchQuery || selectedCategory !== 'All' || inStockOnly) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className="text-stone-600 hover:text-stone-900 underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-stone-300 rounded-lg mt-8 bg-stone-50/50">
          <div className="font-serif text-xl font-medium text-stone-700">No garments matched your criteria</div>
          <p className="text-sm text-stone-500 mt-1">Try relaxing your search terms or view all categories.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-md hover:bg-stone-800"
          >
            View All Pieces
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {filteredProducts.map(product => {
            const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
            const isOutOfStock = totalStock <= 0;
            const isLowStock = totalStock > 0 && totalStock <= 3;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className="group cursor-pointer flex flex-col bg-white border border-stone-200/90 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container with aspect ratio 4:3 */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Subtle Tag / Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-stone-900/90 text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Stock Level Warning Banner if low or out */}
                  {isOutOfStock ? (
                    <div className="absolute inset-x-0 bottom-0 bg-stone-900/85 text-stone-200 text-xs py-1 text-center font-medium">
                      Out of Stock in Addis Boutique
                    </div>
                  ) : isLowStock ? (
                    <div className="absolute inset-x-0 bottom-0 bg-amber-900/85 text-amber-200 text-[11px] py-1 px-2 text-center font-medium">
                      Low Stock · Only {totalStock} piece{totalStock > 1 ? 's' : ''} left
                    </div>
                  ) : null}

                  {/* Quick Action Overlay on desktop */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductId(product.id);
                      }}
                      className="p-2.5 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-transform active:scale-90"
                      title="View comprehensive details and stock"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!isOutOfStock && (
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="p-2.5 bg-stone-900 text-white rounded-full shadow-md hover:bg-stone-800 transition-transform active:scale-90"
                        title="Add to order request bag"
                      >
                        {quickAddedId === product.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-sans uppercase tracking-wider">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{product.collection}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-amber-800 transition-colors">
                      {product.title}
                    </h3>

                    {/* Available Sizes List preview */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[11px] text-stone-400">Sizes:</span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-stone-700">
                        {product.sizes.map(s => (
                          <span
                            key={s.size}
                            className={`px-1 py-0.2 rounded ${
                              s.stock > 0 ? 'bg-stone-100 text-stone-800' : 'text-stone-300 line-through'
                            }`}
                            title={`${s.size}: ${s.stock} in stock`}
                          >
                            {s.size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Primary Action row */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-base font-bold text-stone-950 tabular-nums">
                        {product.priceBirr.toLocaleString()} Birr
                      </div>
                      {product.originalPriceBirr && (
                        <div className="text-[11px] text-stone-400 line-through font-mono">
                          {product.originalPriceBirr.toLocaleString()} Birr
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductId(product.id);
                      }}
                      className="text-xs font-medium text-stone-900 group-hover:text-amber-850 hover:underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Details & Stock</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
