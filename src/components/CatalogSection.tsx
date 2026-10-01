import React, { useState, useMemo } from 'react';
import { Search, Heart, ShoppingBag, Clock, SlidersHorizontal, X } from 'lucide-react';
import { BouquetItem, FlowerCategory } from '../types';
import { READY_BOUQUETS } from '../data/flowers';

interface CatalogSectionProps {
  onSelectBouquet: (bouquet: BouquetItem) => void;
  onAddToCart: (bouquet: BouquetItem) => void;
  onToggleFavorite: (bouquetId: string) => void;
  favoriteIds: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

const CATEGORIES: { id: FlowerCategory | 'sale'; label: string }[] = [
  { id: 'all', label: 'Barcha Gullar' },
  { id: 'sale', label: '🔥 Aksiya & Skidkalar' },
  { id: 'roses', label: 'Atirgullar' },
  { id: 'tulips', label: 'Lolalar' },
  { id: 'peonies', label: 'Pionlar' },
  { id: 'hydrangea', label: 'Gortenziyalar' },
  { id: 'mixed', label: 'Mualliflik Buketlari' },
  { id: 'vip', label: 'Premyera & VIP' },
];

const OCCASIONS = [
  'Barcha holatlar',
  'Tug\'ilgan kun',
  'Sevgi va e\'tirof',
  'Onajonim uchun',
  'To\'y marosimi',
  'Yubiley',
  'Syurpriz'
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectBouquet,
  onAddToCart,
  onToggleFavorite,
  favoriteIds,
  searchQuery,
  onSearchChange,
  searchRef,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory | 'sale'>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Barcha holatlar');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filtered and sorted products
  const filteredBouquets = useMemo(() => {
    return READY_BOUQUETS.filter((item) => {
      // Category filter
      if (selectedCategory === 'sale') {
        if (!item.isOnSale && (!item.discountPercent || item.discountPercent <= 0)) {
          return false;
        }
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'Barcha holatlar' && !item.occasions.includes(selectedOccasion)) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesComp = item.composition.some((c) => c.toLowerCase().includes(q));
        const matchesOccasion = item.occasions.some((o) => o.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesComp && !matchesOccasion) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, selectedOccasion, maxPrice, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-rose-800 tracking-wider uppercase mb-1">
            Bizning Kolleksiya
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-stone-900">
            Klassik va Zamonaviy Guldastalar
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Har kuni ertalab yetkazib beriladigan yangi uzilgan saralangan gullar
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Gul nomi, atirgul, lola qidiring..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Controls */}
      <div className="space-y-4 mb-8">
        
        {/* Category Filter Tabs (Single-line segmented control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors rounded-lg cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Second Row: Occasions, Sort and Price Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 text-xs shrink-0">Sabab:</span>
            {OCCASIONS.map((occ) => {
              const isSelected = selectedOccasion === occ;
              return (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 text-xs whitespace-nowrap rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-rose-100 text-rose-900 font-medium'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-stone-600">
              <span className="text-xs text-stone-500">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc' | 'rating')}
                className="bg-white border border-stone-300 rounded-md px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-rose-800 cursor-pointer"
              >
                <option value="popular">Mashhurlik bo'yicha</option>
                <option value="price-asc">Narxi: Arzondan qimmatga</option>
                <option value="price-desc">Narxi: Qimmatdan arzonga</option>
                <option value="rating">Mijozlar bahosi bo'yicha</option>
              </select>
            </div>

            {/* Price Filter Trigger */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 border rounded-md text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                showFilters ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Narx filtri</span>
            </button>
          </div>

        </div>

        {/* Expandable Price Slider */}
        {showFilters && (
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-stone-600 mb-1.5">
                <span>Maksimal narx chegarasi:</span>
                <span className="font-mono font-semibold text-stone-900">{maxPrice.toLocaleString('uz-UZ')} so'm</span>
              </div>
              <input
                type="range"
                min="300000"
                max="2000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>
            <button
              onClick={() => {
                setMaxPrice(2000000);
                setSelectedCategory('all');
                setSelectedOccasion('Barcha holatlar');
                onSearchChange('');
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer self-start sm:self-auto"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}

      </div>

      {/* Product Grid */}
      {filteredBouquets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif-brand font-semibold text-stone-900">
            Hech qanday guldasta topilmadi
          </h3>
          <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
            Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang. Shuningdek, siz o'zingiz xohlagan guldastani konstruktorda yasashingiz mumkin!
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('all');
              setSelectedOccasion('Barcha holatlar');
              setMaxPrice(2000000);
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            Filtrlarni bekor qilish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBouquets.map((bouquet) => {
            const isFav = favoriteIds.includes(bouquet.id);
            return (
              <div
                key={bouquet.id}
                className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Image Container with aspect ratio and hover lift */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectBouquet(bouquet)}>
                  <img
                    src={bouquet.imageUrl}
                    alt={bouquet.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top tags (Zero-pill text styling) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-1.5">
                      {bouquet.discountPercent && (
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 bg-rose-700 text-white rounded shadow-xs animate-pulse">
                          -{bouquet.discountPercent}% Skidka
                        </span>
                      )}
                      {bouquet.isPopular && (
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-stone-900/85 backdrop-blur-xs text-white rounded">
                          Top Tanlov
                        </span>
                      )}
                      {bouquet.isNew && (
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-stone-800/85 backdrop-blur-xs text-white rounded">
                          Yangi
                        </span>
                      )}
                    </div>
                    {/* Free Bonus badge */}
                    <span className="text-[10px] font-medium bg-amber-500/90 backdrop-blur-xs text-stone-950 px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <span>🎁 Bepul Shokolad / Ichimlik</span>
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(bouquet.id);
                    }}
                    aria-label="Sevimlilarga qo'shish"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-sm transition-transform active:scale-90 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-rose-600 fill-rose-600' : 'hover:text-rose-600'}`} />
                  </button>

                  {/* Quick view text hint on hover */}
                  <div className="absolute bottom-3 left-3 right-3 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs text-white font-medium bg-stone-900/70 backdrop-blur-xs px-3 py-1 rounded-md">
                      Batafsil ma'lumot olish
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                      <span>{bouquet.stemsCount} ta gul</span>
                      <span aria-hidden="true">·</span>
                      <span>H: {bouquet.heightCm} sm</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Clock className="w-3 h-3" />
                        <span>~{bouquet.deliveryTimeEstimateMin} daq</span>
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectBouquet(bouquet)}
                      className="font-serif-brand text-xl font-bold text-stone-900 hover:text-rose-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {bouquet.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                      {bouquet.tagline}
                    </p>
                  </div>

                  {/* Bottom Price & Add Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      {bouquet.originalPrice && (
                        <div className="text-[11px] text-stone-400 line-through font-mono">
                          {bouquet.originalPrice.toLocaleString('uz-UZ')} so'm
                        </div>
                      )}
                      <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                        {bouquet.price.toLocaleString('uz-UZ')} <span className="text-xs font-normal text-stone-500">so'm</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(bouquet)}
                        className="px-3.5 py-2 bg-stone-900 hover:bg-rose-900 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Savatga</span>
                      </button>
                    </div>
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
