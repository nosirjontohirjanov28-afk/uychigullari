import React from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import heroImg from '../assets/images/hero_flower_boutique_1790846917458.jpg';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onOpenBuilder: () => void;
  onCheckDelivery: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onOpenBuilder,
  onCheckDelivery,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-stone-200/70 pt-8 pb-12 sm:pt-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text / Action Module */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 tracking-wider uppercase">
              <span className="w-6 h-px bg-rose-600"></span>
              <span>Uychi Gullari — Eksklyuziv Floristika Atelesi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-brand font-semibold text-stone-900 leading-[1.1] tracking-tight [text-wrap:balance]">
              Tabiatning eng nafis ifori va nozik his-tuyg'ulari
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Uychining saralangan gulzorlaridan eng yangi ochilgan guldastalar. 
              Hozir buyurtma bering: <strong className="text-rose-900">20% gacha bahor skidkasi</strong> va yoniga <strong className="text-rose-900">bepul shokolad yoki mevali ichimlik</strong> sovg'a qilinadi!
            </p>

            {/* Special promo bar */}
            <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-xl flex items-center gap-2 text-xs text-rose-950 font-medium">
              <span className="text-base">🎁</span>
              <span><strong>Mavsumiy Aksiya:</strong> Har bir guldasta xaridiga 0 so'mlik Belgiya shokoladlari yoki elita mevali ichimlik qo'shib beriladi!</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer group active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-rose-300" />
                <span>O'z Buketingni Yaratish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-medium rounded-lg border border-stone-300 transition-colors text-sm sm:text-base cursor-pointer"
              >
                Katalogni Ko'rish
              </button>
            </div>

            {/* Adjacency Proof & Trust Metrics */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div 
                onClick={onCheckDelivery}
                className="cursor-pointer group"
                title="Yetkazib berish vaqtini hisoblash"
              >
                <div className="flex items-center gap-1.5 text-stone-900 font-medium text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-rose-700 shrink-0" />
                  <span className="group-hover:underline">30–45 daqiqa</span>
                </div>
                <div className="text-[12px] text-stone-500 mt-0.5">Tezkor yetkazish</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-medium text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Yangi</span>
                </div>
                <div className="text-[12px] text-stone-500 mt-0.5">Golland & Ekvador</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-medium text-xs sm:text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Onlayn Hamyonlar</span>
                </div>
                <div className="text-[12px] text-stone-500 mt-0.5">Payme, Click, Uzum</div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-16/10 bg-stone-100 border border-stone-200">
              <img
                src={heroImg}
                alt="Eksklyuziv saralangan atirgul va pion guldastasi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Quiet editorial caption tag */}
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-rose-200">Bahor Kolleksiyasi 2026</div>
                  <div className="font-serif-brand text-xl sm:text-2xl font-semibold">Atelier Pastel Miks</div>
                  <div className="text-xs text-stone-200 mt-0.5">29 dona nozik saralangan gul navlari</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-300">Boshlang'ich narx</div>
                  <div className="text-lg font-bold font-mono tabular-nums">640 000 so'm</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
