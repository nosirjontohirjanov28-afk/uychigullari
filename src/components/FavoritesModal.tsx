import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { BouquetItem } from '../types';
import { READY_BOUQUETS } from '../data/flowers';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  onSelectBouquet: (bouquet: BouquetItem) => void;
  onAddToCart: (bouquet: BouquetItem) => void;
  onRemoveFavorite: (bouquetId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  onSelectBouquet,
  onAddToCart,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  const favoriteBouquets = READY_BOUQUETS.filter((b) => favoriteIds.includes(b.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif-brand text-xl font-bold text-stone-900">
              Tanlangan Gullar ({favoriteBouquets.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {favoriteBouquets.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">
                Hozircha hech qanday gul tanlanmagan
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Katalogdagi yurakcha belgisini bosish orqali yoqqan guldastalarni shu yerda saqlab borishingiz mumkin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteBouquets.map((bouquet) => (
                <div
                  key={bouquet.id}
                  className="p-3 rounded-xl border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between bg-stone-50/40"
                >
                  <div className="flex gap-3">
                    <img
                      src={bouquet.imageUrl}
                      alt={bouquet.name}
                      className="w-20 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {bouquet.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {bouquet.stemsCount} ta gul · {bouquet.tagline}
                      </p>
                      <div className="text-xs font-mono font-bold text-rose-950 mt-1.5 tabular-nums">
                        {bouquet.price.toLocaleString('uz-UZ')} so'm
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-200/70">
                    <button
                      onClick={() => onRemoveFavorite(bouquet.id)}
                      className="text-[11px] text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                    >
                      O'chirish
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectBouquet(bouquet);
                          onClose();
                        }}
                        className="text-xs text-stone-700 hover:underline cursor-pointer"
                      >
                        Batafsil
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(bouquet);
                        }}
                        className="px-2.5 py-1.5 bg-stone-900 hover:bg-rose-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Savatga</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-stone-50 border-t border-stone-150 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};
