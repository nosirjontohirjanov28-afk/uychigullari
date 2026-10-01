import React, { useState, useMemo } from 'react';
import { X, Clock, MapPin, Truck, Zap, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TASHKENT_DISTRICTS } from '../data/flowers';
import { DeliveryType } from '../types';

interface DeliveryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeliveryOption?: (district: string, type: DeliveryType, fee: number) => void;
}

export const DeliveryCalculatorModal: React.FC<DeliveryCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectDeliveryOption,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('mirzo-ulugbek');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('express');
  const [selectedHour, setSelectedHour] = useState<string>('12:00 - 13:00');

  const district = useMemo(() => {
    return TASHKENT_DISTRICTS.find((d) => d.id === selectedDistrictId) || TASHKENT_DISTRICTS[0];
  }, [selectedDistrictId]);

  // Dynamic estimated delivery time calculation
  const { arrivalTimeStr, totalDurationMinutes, fee } = useMemo(() => {
    const now = new Date();
    let duration = district.estimatedMinutes;
    let deliveryFee = district.deliveryFee;

    if (deliveryType === 'express') {
      duration = Math.max(25, duration - 10);
      deliveryFee += 35000;
    } else if (deliveryType === 'scheduled') {
      deliveryFee += 10000;
    }

    const arrival = new Date(now.getTime() + duration * 60 * 1000);
    const hours = arrival.getHours().toString().padStart(2, '0');
    const minutes = arrival.getMinutes().toString().padStart(2, '0');

    return {
      arrivalTimeStr: deliveryType === 'scheduled' ? selectedHour : `${hours}:${minutes}`,
      totalDurationMinutes: duration,
      fee: deliveryFee,
    };
  }, [district, deliveryType, selectedHour]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-150 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-brand text-xl font-bold text-stone-900">
                Yetkazib Berish Kalkulyatori
              </h3>
              <p className="text-xs text-stone-500">
                Toshkent shahri va viloyat bo'ylab real-vaqt hisoblagichi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Step 1: District selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-700" />
              <span>1. Tuman yoki hududni tanlang:</span>
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 font-medium focus:outline-none focus:border-rose-800 cursor-pointer"
            >
              {TASHKENT_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.estimatedMinutes} daqiqa) — {d.deliveryFee === 0 ? 'Shahar ichi bepul' : `+${d.deliveryFee.toLocaleString()} so'm`}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Delivery Speed Option */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rose-700" />
              <span>2. Yetkazish tezligi va uslubi:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Express */}
              <div
                onClick={() => setDeliveryType('express')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'express'
                    ? 'border-rose-900 bg-rose-50/50 ring-1 ring-rose-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-rose-900">
                    <Zap className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                    <span>Tezkor Express</span>
                  </div>
                </div>
                <div className="text-xs text-stone-600">30–45 daqiqa ichida</div>
                <div className="text-[11px] font-mono text-stone-500 mt-1.5">
                  +35 000 so'm
                </div>
              </div>

              {/* Standard */}
              <div
                onClick={() => setDeliveryType('standard')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'standard'
                    ? 'border-rose-900 bg-rose-50/50 ring-1 ring-rose-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 mb-1">
                  Standart Yetkazish
                </div>
                <div className="text-xs text-stone-600">Bugun, 2 soat ichida</div>
                <div className="text-[11px] font-mono text-emerald-700 font-semibold mt-1.5">
                  Shahar ichi bepul
                </div>
              </div>

              {/* Scheduled */}
              <div
                onClick={() => setDeliveryType('scheduled')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'scheduled'
                    ? 'border-rose-900 bg-rose-50/50 ring-1 ring-rose-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-bold text-stone-900 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>Aniq Vaqtga</span>
                </div>
                <div className="text-xs text-stone-600">Maxsus syurpriz uchun</div>
                <div className="text-[11px] font-mono text-stone-500 mt-1.5">
                  +10 000 so'm
                </div>
              </div>
            </div>

            {deliveryType === 'scheduled' && (
              <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-600 font-medium">Qulay soat oraliqini tanlang:</span>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="bg-white border border-stone-300 rounded-md px-2.5 py-1 text-xs text-stone-800"
                >
                  <option value="09:00 - 10:00">Ertalab 09:00 - 10:00</option>
                  <option value="12:00 - 13:00">Tushlik 12:00 - 13:00</option>
                  <option value="15:00 - 16:00">Kunduzi 15:00 - 16:00</option>
                  <option value="18:00 - 19:00">Kechki 18:00 - 19:00</option>
                  <option value="20:00 - 21:00">Romantik 20:00 - 21:00</option>
                  <option value="23:30 - 00:00">Yarim tun 00:00 (Syurpriz)</option>
                </select>
              </div>
            )}
          </div>

          {/* Interactive Live Route Simulation Widget */}
          <div className="p-4 bg-stone-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400">Marshrut hisob-kitobi:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Yo'llar ochiq (Tezkor koridor)
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-y border-stone-800">
              <div className="text-left">
                <div className="text-[11px] text-stone-400">Atelye (Boshlang'ich)</div>
                <div className="text-xs font-semibold text-stone-200">Amir Temur sh., 42</div>
              </div>

              <div className="px-3 flex flex-col items-center">
                <div className="text-[10px] text-stone-400 font-mono">
                  ~{(totalDurationMinutes * 0.4).toFixed(1)} km
                </div>
                <div className="w-20 sm:w-28 h-0.5 bg-rose-600 relative flex items-center justify-center my-1">
                  <div className="absolute w-2 h-2 rounded-full bg-rose-400 animate-ping"></div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-stone-400">Manzil</div>
                <div className="text-xs font-semibold text-rose-300">{district.name}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="text-[11px] text-stone-400">Taxminiy yetib borish:</div>
                <div className="text-lg font-bold font-mono text-emerald-300">
                  {deliveryType === 'scheduled' ? selectedHour : `${arrivalTimeStr} gacha`}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-stone-400">Yetkazish narxi:</div>
                <div className="text-lg font-bold font-mono text-white">
                  {fee === 0 ? 'Bepul' : `${fee.toLocaleString('uz-UZ')} so'm`}
                </div>
              </div>
            </div>
          </div>

          {/* Quality Assurance Guarantees */}
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Gullar suvli maxsus aqua-boks va qadoqda sovuq/issiqdan himoyalangan holda olib boriladi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Yetkazishdan oldin kuryer manzilga yetib borish vaqtini SMS orqali tasdiqlaydi</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-150 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Yopish
          </button>
          
          <button
            onClick={() => {
              if (onSelectDeliveryOption) {
                onSelectDeliveryOption(district.name, deliveryType, fee);
              }
              onClose();
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-950 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Ushbu Manzilni Saqlash
          </button>
        </div>

      </div>
    </div>
  );
};
