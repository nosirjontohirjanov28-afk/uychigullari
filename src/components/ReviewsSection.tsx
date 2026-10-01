import React from 'react';
import { Star, ShieldCheck, Heart, Truck, Sparkles } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Dilnoza Karimova',
    location: 'Toshkent sh., Yunusobod',
    comment: 'Onajonimning tug\'ilgan kunlariga "Qirollik Atirgullari" guldastasini buyurtma qildim. 35 daqiqada suvli maxsus kapsulada olib kelishdi. Gullar juda yangi, ifori butun xonaga taraldi!',
    rating: 5,
    date: '28 Fevral 2026',
    orderType: '51 Ekvador atirguli',
  },
  {
    name: 'Jahongir Saidov',
    location: 'Samarqand (Toshkentga syurpriz)',
    comment: 'O\'zim xizmat safarida edim, rafiqamga syurpriz sifatida guldasta va Ferrero shokolad jo\'natdim. Anonim yetkazish xizmati a\'lo darajada ishladi, kuryer fotosurat bilan hisobot berdi.',
    rating: 5,
    date: '14 Fevral 2026',
    orderType: 'Pionlar Orzusi + Sovg\'a',
  },
  {
    name: 'Nodira Usmonova',
    location: 'Toshkent sh., Mirzo Ulug\'bek',
    comment: 'Buket konstruktori juda qulay ekan! O\'zim xohlagan gortenziya va lolalarni terib, o\'rash qog\'ozini tanladim. Narxi va daqiqasi darhol hisoblab berildi. Payme orqali bir soniyada to\'ladim.',
    rating: 5,
    date: '2 Mart 2026',
    orderType: 'Mualliflik Konstruktori',
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Craftsmanship Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-2xl bg-[#1B1917] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto md:mx-0 text-rose-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-brand text-lg font-bold">
                100% Yangilik Kafolati
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Har kuni tongda Gollandiya va Ekvador auksionlaridan keltirilgan eng saralangan yangi gullar.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto md:mx-0 text-rose-300">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-brand text-lg font-bold">
                Maxsus Aqua-Boks Yetkazish
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Guldastalar suvsiz qolmaydi — pastki qismida ozuqaviy namlik kapsulasi bilan yangiligini yo'qotmaydi.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto md:mx-0 text-rose-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif-brand text-lg font-bold">
                Xattotlik Tabriknomasi
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Har bir sovg'a ichiga siz istagan tabrik va ezgu tilaklar qo'lda husnixat bilan bitiladi.
              </p>
            </div>

          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-rose-800 tracking-wider uppercase mb-1">
            Mijozlarimiz Fikrlari
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-stone-900">
            Minglab Tabassumlar Tarixi
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Har bir buyurtma — kimgadir ulashilgan iliqlik va quvonch demakdir
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">{rev.name}</div>
                  <div className="text-[11px] text-stone-500">{rev.location}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-rose-800 font-medium">{rev.orderType}</div>
                  <div className="text-[10px] text-stone-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
