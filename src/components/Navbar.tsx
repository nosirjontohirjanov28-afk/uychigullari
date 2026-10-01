import React from 'react';
import { ShoppingBag, Heart, Sparkles, Truck, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenDeliveryCalc: () => void;
  onOpenOrderTracker: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToBuilder: () => void;
  onFocusSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  favoritesCount,
  petalsEnabled,
  onTogglePetals,
  onOpenCart,
  onOpenFavorites,
  onOpenDeliveryCalc,
  onOpenOrderTracker,
  onNavigateToCatalog,
  onNavigateToBuilder,
  onFocusSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl font-serif-brand font-bold tracking-tight text-stone-900 hover:text-rose-800 transition-colors"
        >
          Uychi Gullari
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={onNavigateToCatalog}
            className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-rose-700 cursor-pointer"
          >
            Gullar Katalogi
          </button>
          <button
            onClick={onNavigateToBuilder}
            className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-rose-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>O'z Buketingni Yarat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          </button>
          <button
            onClick={onOpenDeliveryCalc}
            className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-rose-700 cursor-pointer flex items-center gap-1"
          >
            <Truck className="w-3.5 h-3.5 text-stone-500" />
            <span>Yetkazib Berish</span>
          </button>
          <button
            onClick={onOpenOrderTracker}
            className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-rose-700 cursor-pointer"
          >
            Buyurtmani Kuzatish
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Petals visual toggle */}
          <button
            onClick={onTogglePetals}
            title={petalsEnabled ? "Gul barglari animatsiyasini o'chirish" : "Jonli gul barglari animatsiyasini yoqish"}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              petalsEnabled ? 'text-rose-700 bg-rose-50' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden lg:inline">{petalsEnabled ? 'Animatsiya: Yoqiq' : 'Animatsiya'}</span>
          </button>

          {/* Quick search shortcut button */}
          <button
            onClick={onFocusSearch}
            aria-label="Gullarni qidirish"
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            aria-label="Tanlangan gullar"
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <Heart className={`w-4.5 h-4.5 ${favoritesCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-600 text-white rounded-full text-[11px] font-semibold flex items-center justify-center tabular-nums">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Savatcha"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-rose-950 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Savatcha</span>
          </button>
        </div>

      </div>
    </header>
  );
};
