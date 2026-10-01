import React from 'react';
import { Gift, Check, Sparkles, Wine, Cake, Heart } from 'lucide-react';
import { FreeBonusOption } from '../types';
import { FREE_BONUS_OPTIONS } from '../data/flowers';

interface FreeBonusSelectorProps {
  selectedBonusId: string | null;
  onSelectBonus: (bonus: FreeBonusOption) => void;
  compact?: boolean;
}

export const FreeBonusSelector: React.FC<FreeBonusSelectorProps> = ({
  selectedBonusId,
  onSelectBonus,
  compact = false,
}) => {
  return (
    <div className={`rounded-xl border ${compact ? 'p-3 bg-rose-50/50 border-rose-200' : 'p-4 bg-gradient-to-r from-rose-50/70 via-stone-50 to-amber-50/50 border-rose-200 shadow-xs'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-600 text-white rounded-lg shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-stone-900 font-serif-brand">
                Buyurtmangizga Bepul Bonus Tanlang!
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-rose-600 text-white px-1.5 py-0.5 rounded">
                0 so'm
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Uychi Gullari dan maxsus xushbo'y shirinlik yoki mevali ichimlik sovg'a
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-rose-800 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Aksiya doirasida</span>
        </div>
      </div>

      {/* Grid of Bonus Gifts */}
      <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5'}`}>
        {FREE_BONUS_OPTIONS.map((bonus) => {
          const isSelected = selectedBonusId === bonus.id;
          return (
            <div
              key={bonus.id}
              onClick={() => onSelectBonus(bonus)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-900 bg-white ring-2 ring-rose-800/40 shadow-xs'
                  : 'border-stone-200 bg-white/90 hover:border-rose-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-rose-100 flex items-center justify-center text-rose-800">
                    {bonus.category === 'chocolate' && <Gift className="w-4 h-4" />}
                    {bonus.category === 'drink' && <Wine className="w-4 h-4" />}
                    {bonus.category === 'sweet' && <Cake className="w-4 h-4" />}
                    {bonus.category === 'souvenir' && <Heart className="w-4 h-4" />}
                  </div>

                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-rose-800 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-400 line-through">
                      {bonus.valueEstimateUz.toLocaleString('uz-UZ')} so'm
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-stone-900 leading-snug">
                  {bonus.name}
                </div>

                {!compact && (
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {bonus.description}
                  </p>
                )}
              </div>

              <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono">
                  BEPUL SOVG'A
                </span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-rose-900 font-bold' : 'text-stone-500'}`}>
                  {isSelected ? 'Tanlandi ✓' : 'Tanlash'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
