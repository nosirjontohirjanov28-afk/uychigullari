import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Truck, MapPin, Phone, PackageCheck, Search } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: OrderDetails[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  activeOrders,
}) => {
  const [searchOrderId, setSearchOrderId] = useState<string>('');

  if (!isOpen) return null;

  // Most recent order or searched order
  const displayOrder = activeOrders.find(
    (o) => o.orderId.toLowerCase() === searchOrderId.trim().toLowerCase()
  ) || activeOrders[activeOrders.length - 1];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-rose-800" />
            <h3 className="font-serif-brand text-xl font-bold text-stone-900">
              Buyurtmani Jonli Kuzatish
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Search for other orders */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buyurtma raqamini kiriting (masalan: UG-38291)..."
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800 font-mono"
            />
          </div>

          {!displayOrder ? (
            <div className="text-center py-12">
              <PackageCheck className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">
                Hozirda faol buyurtmangiz mavjud emas
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Katalogdan guldasta tanlang yoki konstruktorda o'z buketingizni yarating.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Order Meta Bar */}
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                    Buyurtma Raqami:
                  </div>
                  <div className="text-base font-bold font-mono text-rose-950">
                    {displayOrder.orderId}
                  </div>
                  {displayOrder.freeBonus && (
                    <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                      🎁 Bonus: {displayOrder.freeBonus.name}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Taxminiy Yetib Borish:</div>
                  <div className="text-sm font-bold font-mono text-emerald-800">
                    Bugun, {displayOrder.estimatedArrivalTimestamp} gacha
                  </div>
                </div>
              </div>

              {/* Step-by-Step Progress Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                  Tayyorlash va Yetkazish Holati:
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <div className="font-semibold text-xs text-stone-900">1. Buyurtma Qabul Qilindi</div>
                    <div className="text-[11px] text-stone-500">To'lov muvaffaqiyatli amalga oshirildi ({displayOrder.createdAt})</div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-rose-700 text-white flex items-center justify-center text-[10px] animate-pulse">
                      ●
                    </span>
                    <div className="font-semibold text-xs text-rose-950">2. Florist Buketni Yig'moqda</div>
                    <div className="text-[11px] text-stone-500">Eng yangi gullar saralanib, lenta va o'ram bog'lanmoqda</div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <div className="font-semibold text-xs text-stone-600">3. Kuryer Yo'lga Chiqadi</div>
                    <div className="text-[11px] text-stone-400">Maxsus termokapsulada manzil sari yo'l oladi</div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <div className="font-semibold text-xs text-stone-600">4. Muvaffaqiyatli Yetkazildi</div>
                    <div className="text-[11px] text-stone-400">Qabul qiluvchiga tabassum bilan topshiriladi</div>
                  </div>

                </div>
              </div>

              {/* Courier and Address Info */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-900 font-bold text-xs">
                      DR
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">{displayOrder.courierName}</div>
                      <div className="text-[10px] text-stone-500">Tezkor florist-kuryer</div>
                    </div>
                  </div>

                  <a
                    href={`tel:${displayOrder.courierPhone}`}
                    className="flex items-center gap-1 text-xs text-rose-900 font-medium hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Qo'ng'iroq</span>
                  </a>
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{displayOrder.deliveryDistrict}, {displayOrder.deliveryAddress}</span>
                  </div>
                  {displayOrder.deliveryNotes && (
                    <div className="text-[11px] text-stone-500 italic pl-5">
                      Izoh: "{displayOrder.deliveryNotes}"
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
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
