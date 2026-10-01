import React, { useState } from 'react';
import { X, Clock, Heart, ShoppingBag, ShieldCheck, Flower2, Sparkles, Check } from 'lucide-react';
import { BouquetItem } from '../types';
import { GREETING_CARD_PRESETS } from '../data/flowers';

interface ProductDetailModalProps {
  bouquet: BouquetItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (bouquet: BouquetItem, customGreetingCard?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (bouquetId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  bouquet,
  isOpen,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [includeCard, setIncludeCard] = useState<boolean>(false);
  const [cardMessage, setCardMessage] = useState<string>('Sizga cheksiz quvonch va baxt tilayman!');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!isOpen || !bouquet) return null;

  const handleAdd = () => {
    onAddToCart(bouquet, includeCard ? cardMessage : undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-stone-100 min-h-[300px]">
            <img
              src={bouquet.imageUrl}
              alt={bouquet.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none md:hidden" />
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5 text-rose-700" />
                  <span className="uppercase tracking-wider font-semibold text-rose-900">
                    Eksklyuziv Kolleksiya
                  </span>
                </div>

                <button
                  onClick={() => onToggleFavorite(bouquet.id)}
                  className="flex items-center gap-1 text-xs text-stone-600 hover:text-rose-600 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-600 fill-rose-600' : ''}`} />
                  <span>{isFavorite ? 'Tanlangan' : 'Saqlash'}</span>
                </button>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-stone-900 leading-tight">
                  {bouquet.name}
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  {bouquet.tagline}
                </p>
              </div>

              {/* Price & Delivery badge */}
              <div className="flex items-baseline justify-between py-2 border-y border-stone-150">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400">Aksiya narxi:</span>
                    {bouquet.originalPrice && (
                      <span className="text-xs line-through text-stone-400 font-mono">
                        {bouquet.originalPrice.toLocaleString('uz-UZ')} so'm
                      </span>
                    )}
                    {bouquet.discountPercent && (
                      <span className="text-[10px] font-bold bg-rose-700 text-white px-1.5 py-0.2 rounded">
                        -{bouquet.discountPercent}% Skidka
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold font-mono text-stone-950 tabular-nums">
                    {bouquet.price.toLocaleString('uz-UZ')} <span className="text-xs font-normal text-stone-500">so'm</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{bouquet.deliveryTimeEstimateMin} daqiqada</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Tezkor yetkazish</div>
                </div>
              </div>

              {/* Free Bonus Notice */}
              <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-900">
                <span className="text-base">🎁</span>
                <span><strong>Bepul Sovg'a:</strong> Ushbu buketga qo'shimcha Belgiya shokoladlari yoki elita mevali ichimlik bepul beriladi!</span>
              </div>

              {/* Composition Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Guldasta Tarkibi va O'lchami:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-150">
                  <div>
                    <span className="text-stone-400 block">Jami poyalar:</span>
                    <span className="font-semibold text-stone-800">{bouquet.stemsCount} ta gul</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Balandlik / Diametr:</span>
                    <span className="font-semibold text-stone-800">{bouquet.heightCm} sm / {bouquet.diameterCm} sm</span>
                  </div>
                </div>

                <ul className="text-xs text-stone-600 space-y-1 pt-1">
                  {bouquet.composition.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold">·</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free Card Message Toggle */}
              <div className="pt-2 border-t border-stone-150">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={includeCard}
                    onChange={(e) => setIncludeCard(e.target.checked)}
                    className="accent-rose-800 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Bepul mualliflik tabriknomasi qo'shish</span>
                </label>

                {includeCard && (
                  <div className="mt-3 space-y-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <textarea
                      rows={2}
                      maxLength={150}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Tabrik so'zingizni yozing..."
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-rose-800 resize-none font-serif-brand text-stone-900"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {GREETING_CARD_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCardMessage(p.text)}
                          className="px-2 py-0.5 text-[10px] bg-white border border-stone-300 hover:border-rose-600 rounded text-stone-600 transition-colors"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Freshness Promise */}
              <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% yangilik kafolati: 10 kundan ortiq yangi turish kafolati</span>
              </div>

            </div>

            {/* Add to Cart Primary Button */}
            <div className="pt-4 border-t border-stone-150">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-rose-900 hover:bg-rose-950 text-white active:scale-98'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Savatchaga qo'shildi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Savatchaga Qo'shish — {bouquet.price.toLocaleString('uz-UZ')} so'm</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
