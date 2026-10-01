import { BouquetItem, CustomFlowerStem, WrapperStyle, RibbonStyle, GiftAddOn, DistrictInfo, FreeBonusOption } from '../types';

import heroBoutiqueImg from '../assets/images/hero_flower_boutique_1790846917458.jpg';
import roseEleganceImg from '../assets/images/bouquet_rose_elegance_1790846936135.jpg';
import springTulipsImg from '../assets/images/bouquet_spring_tulips_1790846952574.jpg';
import peonyDreamImg from '../assets/images/bouquet_peony_dream_1790846968493.jpg';
import orchidHydrangeaImg from '../assets/images/bouquet_orchid_hydrangea_1790846982050.jpg';

export { heroBoutiqueImg };

export const FREE_BONUS_OPTIONS: FreeBonusOption[] = [
  {
    id: 'bonus-choc-belgian',
    name: 'Belgiya Nozik Shokoladlari',
    description: 'Qo\'lda tayyorlangan sutli va qora shokolad pralinelari to\'plami',
    category: 'chocolate',
    icon: 'chocolate',
    valueEstimateUz: 85000,
  },
  {
    id: 'bonus-drink-sparkling',
    name: 'Frantsuz Mevali Shampani (Alkogolsiz)',
    description: 'Nafis oq uzum va shaftoli notalari bilan bayramona muzdek ichimlik',
    category: 'drink',
    icon: 'drink',
    valueEstimateUz: 110000,
  },
  {
    id: 'bonus-raffaello',
    name: 'Raffaello Premium Shirinlik Qutisi',
    description: 'Butun bodom va mayin kokos parchalari bilan qoplangan italyan shirinligi',
    category: 'sweet',
    icon: 'sweet',
    valueEstimateUz: 75000,
  },
  {
    id: 'bonus-macarons',
    name: 'Frantsuz Mevali Makaronlari (6 dona)',
    description: 'Pista, malina, vanil va kofe ta\'mli yangi pishirilgan makaronlar',
    category: 'sweet',
    icon: 'macaron',
    valueEstimateUz: 95000,
  }
];

export const READY_BOUQUETS: BouquetItem[] = [
  {
    id: 'bq-1',
    name: 'Qirollik Atirgullari (51 Ekvador Atirguli)',
    tagline: 'Chuqur muhabbat va ehtirom ifodasi',
    category: 'roses',
    price: 890000,
    originalPrice: 1050000,
    discountPercent: 15,
    isOnSale: true,
    rating: 4.98,
    reviewCount: 142,
    imageUrl: roseEleganceImg,
    stemsCount: 51,
    heightCm: 65,
    diameterCm: 50,
    composition: ['51 dona qizil Ekvador "Explorer" atirguli', 'Premium atlas lenta', 'Namlik saqlovchi maxsus kapsula'],
    description: 'Baland poyali, qirmizi baxmal bargli Ekvador atirgullari. Har bir gul maxsus saralangan va o\'zining xushbo\'y ifori bilan 10-14 kungacha o\'z go\'zalligini saqlab qoladi.',
    deliveryTimeEstimateMin: 45,
    isPopular: true,
    colors: ['#991b1b', '#b91c1c'],
    occasions: ['Sevgi va e\'tirof', 'Tug\'ilgan kun', 'Yubiley']
  },
  {
    id: 'bq-2',
    name: 'Golland Bahori (Pushti va Oq Lolalar)',
    tagline: 'Yengil, nafis va bahoriy kayfiyat',
    category: 'tulips',
    price: 460000,
    originalPrice: 550000,
    discountPercent: 16,
    isOnSale: true,
    rating: 4.92,
    reviewCount: 98,
    imageUrl: springTulipsImg,
    stemsCount: 35,
    heightCm: 45,
    diameterCm: 35,
    composition: ['35 dona yangi uzilgan Golland lolalari', 'Xushbo\'y oq freziya', 'Ekologik mat kraft qog\'oz'],
    description: 'Toza havo va bahor shabadasini xonadoningizga olib kiruvchi yangi uzilgan lolalar uyg\'unligi. Nozik ochilish bosqichida taqdim etiladi.',
    deliveryTimeEstimateMin: 35,
    isNew: true,
    colors: ['#f472b6', '#fbcfe8', '#ffffff'],
    occasions: ['Tug\'ilgan kun', 'Onajonim uchun', 'Minnatdorchilik']
  },
  {
    id: 'bq-3',
    name: 'Pionlar Orzusi (Sarah Bernhardt)',
    tagline: 'Ko\'p qatlamli, xushbo\'y va qirollarga xos',
    category: 'peonies',
    price: 1150000,
    originalPrice: 1290000,
    discountPercent: 11,
    isOnSale: false,
    rating: 5.0,
    reviewCount: 86,
    imageUrl: peonyDreamImg,
    stemsCount: 25,
    heightCm: 55,
    diameterCm: 45,
    composition: ['25 dona "Sarah Bernhardt" pionlari', 'Fransuz lavandasi novdalari', 'Kumushrang ipak lenta'],
    description: 'Fransuz bog\'larining eng nafis marvaridi. Uning ulkan sharsimon gullari va mayin vanilsimon ifori har qanday yurakni larzaga keltiradi.',
    deliveryTimeEstimateMin: 50,
    isPopular: true,
    colors: ['#fda4af', '#f43f5e', '#fff1f2'],
    occasions: ['To\'y marosimi', 'Romantika', 'Maxsus sana']
  },
  {
    id: 'bq-4',
    name: 'Moviy Gortenziya va Oq Orkideya',
    tagline: 'Arxitekturaviy nafislik va zamonaviy estetika',
    category: 'hydrangea',
    price: 780000,
    originalPrice: 920000,
    discountPercent: 15,
    isOnSale: true,
    rating: 4.94,
    reviewCount: 64,
    imageUrl: orchidHydrangeaImg,
    stemsCount: 19,
    heightCm: 50,
    diameterCm: 40,
    composition: ['3 dona ulkan moviy gortenziya', '5 dona kaskadli Phalaenopsis orkideyasi', 'Siniy evkalipt shoxlari', 'Zamonaviy shaffof o\'ram'],
    description: 'Zamonaviy floristika san\'atining durdonasi. Moviy osmon tusidagi gortenziyalar va oq orkideyalarning aristokratik kontrasti.',
    deliveryTimeEstimateMin: 40,
    colors: ['#38bdf8', '#0284c7', '#ffffff'],
    occasions: ['Biznes tabrik', 'Yubiley', 'Uyga fayz']
  },
  {
    id: 'bq-5',
    name: 'Atelier Pastel Miks (Artisan Bouquet)',
    tagline: 'Floristlarimiz tomonidan yaratilgan mualliflik asari',
    category: 'mixed',
    price: 640000,
    originalPrice: 800000,
    discountPercent: 20,
    isOnSale: true,
    rating: 4.96,
    reviewCount: 112,
    imageUrl: heroBoutiqueImg,
    stemsCount: 29,
    heightCm: 50,
    diameterCm: 42,
    composition: ['Pushti David Austin atirgullari', 'Ranunculus gullari', 'Pushti pionlar', 'Moviy evkalipt barglari', 'Matoviy zaytun qog\'ozi'],
    description: 'Eksklyuziv ranglar palitrasi. Har bir guldasta bosh floristimiz tomonidan individual tarzda, eng yangi gullardan jamlanadi.',
    deliveryTimeEstimateMin: 40,
    isPopular: true,
    colors: ['#f43f5e', '#fb7185', '#a7f3d0'],
    occasions: ['Tug\'ilgan kun', 'Sevgi va e\'tirof', 'Syurpriz']
  },
  {
    id: 'bq-6',
    name: '101 Qizil Atirgul "Buyuk Muhabbat" (VIP Grand)',
    tagline: 'Unutilmas taassurot qoldiruvchi ulug\'vor sovg\'a',
    category: 'vip',
    price: 1850000,
    originalPrice: 2200000,
    discountPercent: 16,
    isOnSale: true,
    rating: 5.0,
    reviewCount: 53,
    imageUrl: roseEleganceImg,
    stemsCount: 101,
    heightCm: 70,
    diameterCm: 65,
    composition: ['101 dona bir xil ochilgan Ekvador qizil atirgullari', 'Oltin zardo\'zi lenta', 'VIP tabriknoma va parvarish vositasi'],
    description: 'Yurak so\'zlarini aytish uchun eng mukammal guldasta. 101 ta oliy toifali atirgul xonani xushbo\'y iforga to\'ldiradi.',
    deliveryTimeEstimateMin: 60,
    colors: ['#991b1b', '#7f1d1d'],
    occasions: ['Turmush qurish taklifi', 'Yubiley', 'Katta e\'tirof']
  }
];

export const CUSTOM_FLOWER_STEMS: CustomFlowerStem[] = [
  {
    id: 'stem-rose-red',
    name: 'Qizil Ekvador Atirguli',
    uzName: 'Qizil Atirgul',
    variety: 'Explorer Ekvador (70cm)',
    pricePerStem: 22000,
    colorHex: '#be123c',
    colorName: 'Qizil baxmal',
    fragranceLevel: 'Xushbo\'y',
    symbolism: 'Ehtirosli muhabbat va qat\'iy sadoqat'
  },
  {
    id: 'stem-rose-white',
    name: 'Oq Avalanche Atirguli',
    uzName: 'Oq Atirgul',
    variety: 'Avalanche Oliy Nav',
    pricePerStem: 20000,
    colorHex: '#f8fafc',
    colorName: 'Sadafdek oq',
    fragranceLevel: 'Nafis',
    symbolism: 'Beg\'uborlik, samimiyat va toza niyat'
  },
  {
    id: 'stem-rose-pink',
    name: 'Pushti Ohara Atirguli',
    uzName: 'Pushti Atirgul',
    variety: 'Pink O\'Hara Fransuz',
    pricePerStem: 24000,
    colorHex: '#fb7185',
    colorName: 'Pushti atir',
    fragranceLevel: 'Xushbo\'y',
    symbolism: 'Muloyimlik, yoshlik va nafosat'
  },
  {
    id: 'stem-tulip-pink',
    name: 'Golland Pushti Lolasi',
    uzName: 'Golland Lolasi',
    variety: 'Dynasty Gollandiya',
    pricePerStem: 15000,
    colorHex: '#f472b6',
    colorName: 'Och pushti',
    fragranceLevel: 'Yengil',
    symbolism: 'Bahor yangilanishi va baxt quvonchi'
  },
  {
    id: 'stem-peony-coral',
    name: 'Royal Koral Pioni',
    uzName: 'Koral Pion',
    variety: 'Coral Sunset Gigant',
    pricePerStem: 45000,
    colorHex: '#fb923c',
    colorName: 'Koral shaftoli',
    fragranceLevel: 'Xushbo\'y',
    symbolism: 'Omad, to\'kin-sochinlik va boylik'
  },
  {
    id: 'stem-peony-white',
    name: 'Oq Duchesse Pioni',
    uzName: 'Oq Pion',
    variety: 'Duchesse de Nemours',
    pricePerStem: 42000,
    colorHex: '#fef08a',
    colorName: 'Qaymoqrang oq',
    fragranceLevel: 'Xushbo\'y',
    symbolism: 'Aslzodalik va ichki xotirjamlik'
  },
  {
    id: 'stem-hydrangea-blue',
    name: 'Moviy Gortenziya (Katta boshli)',
    uzName: 'Moviy Gortenziya',
    variety: 'Hydrangea Macrophylla',
    pricePerStem: 55000,
    colorHex: '#38bdf8',
    colorName: 'Samo moviysi',
    fragranceLevel: 'Yengil',
    symbolism: 'Samimiy minnatdorchilik va chuqur tushunish'
  },
  {
    id: 'stem-lavender',
    name: 'Provans Lavandasi (Dasta)',
    uzName: 'Fransuz Lavandasi',
    variety: 'Lavandula Angustifolia',
    pricePerStem: 12000,
    colorHex: '#a855f7',
    colorName: 'Binafsharang ifor',
    fragranceLevel: 'Xushbo\'y',
    symbolism: 'Tinchlik, sadoqat va xush kayfiyat'
  },
  {
    id: 'stem-gypsophila',
    name: 'Oq Gipsofila (Bulutdek)',
    uzName: 'Oq Gipsofila',
    variety: 'Million Stars',
    pricePerStem: 14000,
    colorHex: '#e2e8f0',
    colorName: 'Yulduzlar to\'dasi',
    fragranceLevel: 'Yengil',
    symbolism: 'Doimiy hamrohlik va iliqlik'
  },
  {
    id: 'stem-eucalyptus',
    name: 'Siniy Evkalipt Novdasi',
    uzName: 'Evkalipt Novdasi',
    variety: 'Cinerea Zangori',
    pricePerStem: 10000,
    colorHex: '#6ee7b7',
    colorName: 'Kumush zangori',
    fragranceLevel: 'Nafis',
    symbolism: 'Tabiiy himoya, tetiklik va zamonaviylik'
  }
];

export const WRAPPER_STYLES: WrapperStyle[] = [
  {
    id: 'wrap-kraft-eco',
    name: 'Ekologik Matoviy Kraft',
    colorHex: '#d7c4ab',
    previewBg: 'bg-[#d7c4ab]',
    texture: 'Tabiiy daraxt tolali ekologik qog\'oz',
    price: 25000
  },
  {
    id: 'wrap-sage-green',
    name: 'Aristokrat Zaytun Mat',
    colorHex: '#9ca3af',
    previewBg: 'bg-[#849285]',
    texture: 'Yumshoq teginishli suv o\'tkazmaydigan mat',
    price: 35000
  },
  {
    id: 'wrap-blush-pink',
    name: 'Pushti Marvarid Tuman',
    colorHex: '#fce7f3',
    previewBg: 'bg-[#fbcfe8]',
    texture: 'Koreyscha yarim shaffof dizaynerlik plyonkasi',
    price: 30000
  },
  {
    id: 'wrap-black-luxury',
    name: 'VIP Mat Qora Obsidian',
    colorHex: '#18181b',
    previewBg: 'bg-[#18181b]',
    texture: 'Yuqori kontrastli qora qalin material',
    price: 40000
  },
  {
    id: 'wrap-organza-white',
    name: 'Koreyscha Oq Organza',
    colorHex: '#ffffff',
    previewBg: 'bg-[#f8fafc] border border-stone-200',
    texture: 'Yengil havodor to\'lqinsimon qatlam',
    price: 35000
  }
];

export const RIBBON_STYLES: RibbonStyle[] = [
  {
    id: 'ribbon-gold',
    name: 'Oltinrang Ipak Lenta',
    colorHex: '#d97706',
    price: 15000
  },
  {
    id: 'ribbon-crimson',
    name: 'Qizil Baxmal Lenta',
    colorHex: '#991b1b',
    price: 15000
  },
  {
    id: 'ribbon-pearl',
    name: 'Sadaf Oq Atlas',
    colorHex: '#f1f5f9',
    price: 10000
  },
  {
    id: 'ribbon-emerald',
    name: 'Zumrad Yashil Ipak',
    colorHex: '#065f46',
    price: 15000
  }
];

export const GIFT_ADDONS: GiftAddOn[] = [
  {
    id: 'gift-choc-ferrero',
    name: 'Ferrero Rocher (16 dona)',
    description: 'Italiya shokoladli shirinliklari, guldastaga nafis qo\'shimcha',
    price: 135000,
    iconName: 'gift'
  },
  {
    id: 'gift-bear-soft',
    name: 'Yumshoq Oq Ayiqcha (30 sm)',
    description: 'Antiallergen mayin paxtadan tikilgan, sovg\'abop lenta bilan',
    price: 145000,
    iconName: 'heart'
  },
  {
    id: 'gift-balloons-heart',
    name: 'Geliy Sharlari "Yurakchalar" (5 dona)',
    description: 'Qizil va oltin yaltiroq folga sharlari, uchib ketmasligi uchun og\'irlik bilan',
    price: 95000,
    iconName: 'sparkles'
  },
  {
    id: 'gift-candle-scented',
    name: 'Organik Parfyum Sham (Pion & Vanil)',
    description: 'Tabiiy soya mumidan qo\'lda quyilgan xushbo\'y sham',
    price: 110000,
    iconName: 'flame'
  },
  {
    id: 'gift-choc-truffles',
    name: 'Shveytsariya Truffel Shokoladlari',
    description: '12 dona elita qora va sutli truffel shokoladlari',
    price: 160000,
    iconName: 'gift'
  },
  {
    id: 'gift-drink-champagne',
    name: 'Spumante Premium Shampan (Alkogolsiz)',
    description: 'Guldastaga bayramona kayfiyat baxsh etuvchi muzdek elita ichimlik',
    price: 175000,
    iconName: 'wine'
  }
];

export const TASHKENT_DISTRICTS: DistrictInfo[] = [
  { id: 'uychi-markaz', name: 'Uychi tumani markazi & mahallalari', estimatedMinutes: 20, deliveryFee: 0 },
  { id: 'namangan-shahar', name: 'Namangan shahri (Barcha dahalar)', estimatedMinutes: 30, deliveryFee: 0 },
  { id: 'chortoq', name: 'Chortoq tumani', estimatedMinutes: 35, deliveryFee: 15000 },
  { id: 'uchqorgon', name: 'Uchqo\'rg\'on tumani', estimatedMinutes: 35, deliveryFee: 15000 },
  { id: 'toraqorgon', name: 'To\'raqo\'rg\'on tumani', estimatedMinutes: 40, deliveryFee: 15000 },
  { id: 'kosonsoy', name: 'Kosonsoy tumani', estimatedMinutes: 45, deliveryFee: 20000 },
  { id: 'chust', name: 'Chust & Pop tumanlari', estimatedMinutes: 50, deliveryFee: 25000 },
  { id: 'toshkent-express', name: 'Toshkent shahri (Ekspress reys)', estimatedMinutes: 60, deliveryFee: 35000 },
  { id: 'mirzo-ulugbek', name: 'Toshkent: Mirzo Ulug\'bek & Yunusobod', estimatedMinutes: 60, deliveryFee: 35000 },
  { id: 'chilonzor', name: 'Toshkent: Chilonzor & Yakkasaroy', estimatedMinutes: 60, deliveryFee: 35000 },
];

export const GREETING_CARD_PRESETS = [
  {
    title: 'Sevgi & Ehtirom',
    text: 'Har bir ochilgan gul bargi sen haqingdagi o\'ylarim kabi cheksiz va go\'zal. Doimo yonimda bo\'l, azizam!'
  },
  {
    title: 'Tug\'ilgan Kun Tabrigi',
    text: 'Tug\'ilgan kuningiz muborak bo\'lsin! Hayotingiz doimo bahor gullaridek tarovatli, quvonchli va baxtga to\'la bo\'lsin.'
  },
  {
    title: 'Onajonimga Tashakkur',
    text: 'Dunyodagi eng mehribon va fozila onajonimga! Har bir tabassumingiz biz uchun eng ulug\' baxt. Umringiz uzoq bo\'lsin!'
  },
  {
    title: 'Romantik Syurpriz',
    text: 'Hech qanday sababsiz, shunchaki bugun kayfiyatingiz xushnud bo\'lishi va chehrangizda tabassum porlashi uchun.'
  }
];
