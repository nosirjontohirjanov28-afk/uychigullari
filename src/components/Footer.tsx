import React from 'react';
import { Phone, MapPin, Clock, Send, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToCatalog: () => void;
  onNavigateToBuilder: () => void;
  onOpenDeliveryCalc: () => void;
  onOpenOrderTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCatalog,
  onNavigateToBuilder,
  onOpenDeliveryCalc,
  onOpenOrderTracker,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <span className="text-2xl font-serif-brand font-bold text-white tracking-wide">
              Uychi Gullari
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Uychi tumani va butun vodiy hamda Toshkent bo'ylab yangi uzilgan saralangan gullar, 
              eksklyuziv guldastalar va 20% gacha aksiyalar atelesi.
            </p>
            <div className="text-xs text-rose-300 font-medium">
              Ish vaqti: 24/7 (Dam olish kunlarisiz)
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Bo'limlar
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onNavigateToCatalog}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gullar Katalogi
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBuilder}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  O'z Buketingni Yaratish
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeliveryCalc}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Yetkazib Berish Narxlari
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrderTracker}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buyurtmani Jonli Kuzatish
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Bog'lanish va Manzil
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href="tel:+998712000000" className="hover:text-white font-mono">
                  +998 (71) 200-00-00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-mono">@uychigullari_bot</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Namangan viloyati, Uychi tumani, Mustaqillik shox ko'chasi 18</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payments & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Qabul Qilinadigan To'lovlar
            </h4>
            <p className="text-xs text-stone-400">
              Elektron hamyonlar orqali bir lahzada komissiyasiz xavfsiz to'lang:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Payme</span>
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Click</span>
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Uzum Pay</span>
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Uzcard</span>
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Humo</span>
              <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded">Visa</span>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Uychi Gullari Boutique. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-1">
            <span>Sevgi va nafosat ila yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          </div>
        </div>

      </div>
    </footer>
  );
};
