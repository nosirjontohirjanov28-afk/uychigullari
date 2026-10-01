import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { CartItem, FreeBonusOption } from '../types';
import { FreeBonusSelector } from './FreeBonusSelector';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => boolean;
  appliedDiscountPercent: number;
  selectedBonus: FreeBonusOption | null;
  onSelectBonus: (bonus: FreeBonusOption) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  promoCode,
  onApplyPromoCode,
  appliedDiscountPercent,
  selectedBonus,
  onSelectBonus,
}) => {
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<boolean>(appliedDiscountPercent > 0);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (appliedDiscountPercent / 100));
  const freeShippingThreshold = 500000;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = isFreeDelivery || items.length === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const ok = onApplyPromoCode(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoSuccess(false);
      setPromoError('Noto\'g\'ri promokod. "BAHOR2025" yoki "GUL2025" kodini sinab ko\'ring!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-800" />
              <h2 className="font-serif-brand text-xl font-bold text-stone-900">
                Savatcha ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                  title="Savatchani bo'shatish"
                >
                  Tozalash
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Bar */}
          {items.length > 0 && (
            <div className="bg-rose-50/70 border-b border-rose-100 px-6 py-2.5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-rose-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                  {isFreeDelivery
                    ? 'Tabriklaymiz! Siz uchun yetkazib berish bepul!'
                    : `Yana ${(freeShippingThreshold - subtotal).toLocaleString('uz-UZ')} so'm xarid qiling va yetkazish BEPUL bo'ladi!`}
                </span>
              </div>
              <div className="w-full bg-rose-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-rose-700 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-150">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-brand text-xl font-bold text-stone-900 mb-1">
                  Savatchangiz bo'sh
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Bizning nozik guldastalar kolleksiyasidan tanlang yoki o'z shaxsiy buketingizni yarating.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-rose-950 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Gullarni Ko'rish
                </button>
              </div>
            ) : (
              items.map((item) => {
                const title = item.isCustom
                  ? item.customBouquet?.title || 'Shaxsiy Guldasta'
                  : item.bouquet?.name || 'Guldasta';
                
                const imageSrc = item.isCustom ? undefined : item.bouquet?.imageUrl;

                return (
                  <div key={item.cartItemId} className="py-4 flex gap-4 items-start">
                    
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={title}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-800 font-serif-brand text-xs font-bold p-1 text-center">
                          Mualliflik Buketi
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                          {title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          aria-label="Mahsulotni o'chirish"
                          className="text-stone-400 hover:text-rose-700 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Custom note or postcard preview */}
                      {item.selectedGreetingCard && (
                        <div className="text-[11px] text-stone-500 italic truncate mt-0.5">
                          "{item.selectedGreetingCard}"
                        </div>
                      )}

                      <div className="text-xs font-mono font-bold text-stone-900 mt-1 tabular-nums">
                        {item.unitPrice.toLocaleString('uz-UZ')} so'm
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })
            )}

            {/* Free Bonus Selector inside cart drawer */}
            {items.length > 0 && (
              <div className="pt-4">
                <FreeBonusSelector
                  selectedBonusId={selectedBonus?.id || null}
                  onSelectBonus={onSelectBonus}
                  compact={true}
                />
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promokod: BAHOR2025"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-rose-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Qo'llash
                  </button>
                </div>
                {promoSuccess && (
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Promokod qo'llandi: {appliedDiscountPercent}% chegirma!</span>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-700">{promoError}</div>
                )}
              </form>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Mahsulotlar:</span>
                  <span className="font-mono tabular-nums">{subtotal.toLocaleString('uz-UZ')} so'm</span>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Chegirma ({appliedDiscountPercent}%):</span>
                    <span className="font-mono tabular-nums">-{discountAmount.toLocaleString('uz-UZ')} so'm</span>
                  </div>
                )}

                {selectedBonus && (
                  <div className="flex justify-between text-rose-950 font-medium bg-rose-50/80 p-1.5 rounded">
                    <span>🎁 Bepul Bonus ({selectedBonus.name}):</span>
                    <span className="font-mono text-emerald-700">0 so'm (Sovg'a)</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-medium">Bepul</span>
                    ) : (
                      `${deliveryFee.toLocaleString('uz-UZ')} so'm`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Jami to'lov:</span>
                  <span className="font-mono tabular-nums text-rose-950">
                    {finalTotal.toLocaleString('uz-UZ')} so'm
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-rose-900 hover:bg-rose-950 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>To'lovga O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-400">
                🔒 Payme, Click, Uzum Pay orqali xavfsiz to'lov
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
