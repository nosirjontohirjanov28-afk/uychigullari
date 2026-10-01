import React, { useState, useMemo } from 'react';
import { Plus, Minus, Sparkles, RefreshCw, ShoppingBag, Clock, Heart, Check, FileText } from 'lucide-react';
import { CustomBouquetConfig, CartItem } from '../types';
import { 
  CUSTOM_FLOWER_STEMS, 
  WRAPPER_STYLES, 
  RIBBON_STYLES, 
  GIFT_ADDONS,
  GREETING_CARD_PRESETS 
} from '../data/flowers';
import { sounds } from '../utils/audio';

interface BouquetBuilderProps {
  onAddCustomBouquetToCart: (item: CartItem) => void;
  onOpenDeliveryInfo: () => void;
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({
  onAddCustomBouquetToCart,
  onOpenDeliveryInfo,
}) => {
  // Stems selection state (flowerId -> quantity)
  const [stems, setStems] = useState<Record<string, number>>({
    'stem-rose-red': 7,
    'stem-peony-coral': 3,
    'stem-eucalyptus': 4,
    'stem-gypsophila': 3,
  });

  const [selectedWrapperId, setSelectedWrapperId] = useState<string>('wrap-sage-green');
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>('ribbon-gold');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [cardMessage, setCardMessage] = useState<string>('Sening tabassuming har qanday guldan ham go\'zalroq!');
  const [recipientName, setRecipientName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'flowers' | 'wrapping' | 'addons' | 'card'>('flowers');

  // Handle quantity change
  const handleUpdateStem = (stemId: string, delta: number) => {
    setStems((prev) => {
      const current = prev[stemId] || 0;
      const next = Math.max(0, current + delta);
      if (next > 50) return prev; // safe cap
      
      if (delta > 0) {
        sounds.playAddFlower();
      }
      return {
        ...prev,
        [stemId]: next,
      };
    });
  };

  const handleReset = () => {
    setStems({
      'stem-rose-red': 5,
      'stem-peony-white': 2,
      'stem-eucalyptus': 3,
    });
    setSelectedWrapperId('wrap-sage-green');
    setSelectedRibbonId('ribbon-gold');
    setSelectedAddOns([]);
  };

  // Toggle add-on
  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Total stem count
  const totalStems = useMemo(() => {
    return Object.values(stems).reduce((sum, q) => sum + q, 0);
  }, [stems]);

  // Selected wrapper and ribbon objects
  const selectedWrapper = WRAPPER_STYLES.find((w) => w.id === selectedWrapperId) || WRAPPER_STYLES[0];
  const selectedRibbon = RIBBON_STYLES.find((r) => r.id === selectedRibbonId) || RIBBON_STYLES[0];

  // Live Price Calculation
  const totalPrice = useMemo(() => {
    let price = 0;
    // Flowers
    Object.entries(stems).forEach(([id, qty]) => {
      const stemObj = CUSTOM_FLOWER_STEMS.find((s) => s.id === id);
      if (stemObj && qty > 0) {
        price += stemObj.pricePerStem * qty;
      }
    });
    // Wrapper
    price += selectedWrapper.price;
    // Ribbon
    price += selectedRibbon.price;
    // Add-ons
    selectedAddOns.forEach((addonId) => {
      const gift = GIFT_ADDONS.find((g) => g.id === addonId);
      if (gift) price += gift.price;
    });

    return price;
  }, [stems, selectedWrapper, selectedRibbon, selectedAddOns]);

  // Estimated preparation time based on stem count
  const preparationTimeMin = useMemo(() => {
    if (totalStems === 0) return 0;
    if (totalStems < 10) return 15;
    if (totalStems < 25) return 25;
    return 35;
  }, [totalStems]);

  // Delivery estimation
  const totalEstimatedTimeMin = preparationTimeMin + 30; // 30 min transit

  // Flatten stems for dynamic visual rendering
  const activeFlowerTokens = useMemo(() => {
    const list: { id: string; color: string; name: string }[] = [];
    Object.entries(stems).forEach(([stemId, qty]) => {
      const stemObj = CUSTOM_FLOWER_STEMS.find((s) => s.id === stemId);
      if (stemObj) {
        for (let i = 0; i < qty; i++) {
          list.push({
            id: `${stemId}-${i}`,
            color: stemObj.colorHex,
            name: stemObj.uzName,
          });
        }
      }
    });
    return list;
  }, [stems]);

  // Add to cart handler
  const handleAddToCart = () => {
    if (totalStems === 0) return;

    sounds.playChime();

    const customConfig: CustomBouquetConfig = {
      id: `custom-${Date.now()}`,
      title: `Shaxsiy Buket (${totalStems} ta saralangan gul)`,
      stems,
      wrapperId: selectedWrapperId,
      ribbonId: selectedRibbonId,
      addOnIds: selectedAddOns,
      cardMessage,
      recipientName: recipientName.trim() || 'Hurmatli qabul qiluvchi',
      totalStems,
      preparationTimeMin,
      totalPrice,
    };

    const cartItem: CartItem = {
      cartItemId: `item-custom-${Date.now()}`,
      isCustom: true,
      customBouquet: customConfig,
      quantity: 1,
      selectedGreetingCard: cardMessage,
      selectedRibbon: selectedRibbon.name,
      customNote: cardMessage,
      unitPrice: totalPrice,
    };

    onAddCustomBouquetToCart(cartItem);
  };

  return (
    <section id="bouquet-builder-section" className="py-14 sm:py-20 bg-stone-100/60 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-rose-800 tracking-wider uppercase mb-1">
            Interaktiv Floristika Studiyasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-stone-900 [text-wrap:balance]">
            O'z Orzuingizdagi Guldastani Yarating
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Har bir gulni alohida tanlang, o'rash qog'ozi va lentasini uyg'unlashtiring. 
            Narx va tayyorlanish vaqti jonli tarzda aniqlanadi!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive 2D/3D-feel Visualizer Canvas */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-700" />
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Jonli Buket Modeli
                </span>
              </div>
              <button
                onClick={handleReset}
                title="Boshlang'ich holatga qaytarish"
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            </div>

            {/* Visual Bouquet Stage */}
            <div className="relative h-80 sm:h-96 w-full my-4 rounded-xl bg-radial from-rose-50/70 via-stone-50 to-stone-100 flex items-center justify-center overflow-hidden border border-stone-150">
              
              {/* If no flowers selected */}
              {totalStems === 0 ? (
                <div className="text-center p-6 text-stone-400">
                  <div className="text-3xl mb-2">🌸</div>
                  <p className="text-sm font-medium text-stone-600">Buket hozircha bo'sh</p>
                  <p className="text-xs mt-1">O'ng tarafdan o'zingiz yoqtirgan gullarni qo'shing</p>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Stem & Leaves background layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                    <g opacity="0.8">
                      {/* Green stem lines converging towards cone center */}
                      {activeFlowerTokens.slice(0, 30).map((_, idx) => {
                        const angle = ((idx / Math.min(30, activeFlowerTokens.length)) - 0.5) * 1.4;
                        const startX = 200 + Math.sin(angle) * (60 + (idx % 4) * 20);
                        const startY = 130 + Math.cos(angle) * (15 + (idx % 3) * 15);
                        return (
                          <line
                            key={`stem-line-${idx}`}
                            x1={startX}
                            y1={startY}
                            x2={200 + (idx % 3 - 1) * 8}
                            y2={290}
                            stroke="#4d7c0f"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </g>
                  </svg>

                  {/* Dynamic Flower Heads Cloud (Radial natural distribution) */}
                  <div className="absolute top-6 inset-x-0 h-52 flex items-center justify-center">
                    <div className="relative w-64 h-52">
                      {activeFlowerTokens.map((flower, idx) => {
                        // Calculate spiral/radial position for authentic bouquet shape
                        const count = activeFlowerTokens.length;
                        const phi = idx * 137.5 * (Math.PI / 180); // golden ratio angle
                        const radius = Math.min(95, Math.sqrt(idx / Math.max(1, count)) * 85 + (idx % 2) * 8);
                        const x = 128 + radius * Math.cos(phi);
                        const y = 95 + radius * Math.sin(phi) * 0.75; // slight oval flatten
                        const scale = 0.85 + ((idx % 3) * 0.1);
                        const rotation = (idx * 47) % 360;

                        return (
                          <div
                            key={flower.id}
                            className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{
                              left: `${x}px`,
                              top: `${y}px`,
                              zIndex: Math.floor(y),
                            }}
                            title={flower.name}
                          >
                            {/* Realistic Flower SVG Head with Petal Layers */}
                            <svg
                              width={38 * scale}
                              height={38 * scale}
                              viewBox="0 0 40 40"
                              className="filter drop-shadow-md transition-transform group-hover:scale-125"
                              style={{ transform: `rotate(${rotation}deg)` }}
                            >
                              {/* Outer Petals */}
                              <circle cx="20" cy="11" r="7" fill={flower.color} opacity="0.9" />
                              <circle cx="29" cy="20" r="7" fill={flower.color} opacity="0.9" />
                              <circle cx="20" cy="29" r="7" fill={flower.color} opacity="0.9" />
                              <circle cx="11" cy="20" r="7" fill={flower.color} opacity="0.9" />
                              <circle cx="26" cy="14" r="6" fill={flower.color} opacity="0.95" />
                              <circle cx="26" cy="26" r="6" fill={flower.color} opacity="0.95" />
                              <circle cx="14" cy="26" r="6" fill={flower.color} opacity="0.95" />
                              <circle cx="14" cy="14" r="6" fill={flower.color} opacity="0.95" />
                              
                              {/* Core Center */}
                              <circle cx="20" cy="20" r="6" fill={flower.color} />
                              <circle cx="20" cy="20" r="3" fill="#fef08a" opacity="0.75" />
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Wrapper Paper (Dynamic styled cone) */}
                  <div
                    className="absolute bottom-6 w-44 h-40 transition-colors duration-300 filter drop-shadow-lg"
                    style={{
                      clipPath: 'polygon(15% 0%, 85% 0%, 65% 100%, 35% 100%)',
                      backgroundColor: selectedWrapper.colorHex,
                    }}
                  >
                    {/* Inner texture lines */}
                    <div className="w-full h-full bg-linear-to-b from-black/5 via-white/10 to-black/30 flex items-center justify-center">
                      <span className="text-[10px] tracking-widest uppercase font-serif-brand font-semibold text-white/90 drop-shadow-xs">
                        Uychi Gullari Atelier
                      </span>
                    </div>
                  </div>

                  {/* Silk Ribbon Knot */}
                  <div
                    className="absolute bottom-16 w-14 h-5 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 z-30"
                    style={{ backgroundColor: selectedRibbon.colorHex }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white/40"></div>
                  </div>

                  {/* Greeting Postcard Mini Badge if written */}
                  {cardMessage && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs border border-stone-200 rounded-md p-1.5 shadow-xs max-w-[150px] text-left pointer-events-none">
                      <div className="flex items-center gap-1 text-[10px] text-stone-400">
                        <FileText className="w-2.5 h-2.5 text-rose-700" />
                        <span>Tabriknoma</span>
                      </div>
                      <p className="text-[10px] text-stone-700 font-medium line-clamp-1 italic">
                        "{cardMessage}"
                      </p>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Live Metrics Bar */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-lg">
                  <span className="text-stone-500 block">Jami gullar soni:</span>
                  <span className="font-semibold text-stone-900 font-mono text-sm tabular-nums">
                    {totalStems} dona gul
                  </span>
                </div>

                <div 
                  onClick={onOpenDeliveryInfo}
                  className="p-2.5 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors group"
                >
                  <span className="text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-rose-700" />
                    <span className="group-hover:underline">Tayyor & Yetkazish:</span>
                  </span>
                  <span className="font-semibold text-stone-900 font-mono text-sm tabular-nums">
                    ~{totalEstimatedTimeMin} daqiqa
                  </span>
                </div>
              </div>

              {/* Live Price & Savatga Button */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-400">Jami hisoblangan narx:</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-rose-950 tabular-nums">
                    {totalPrice.toLocaleString('uz-UZ')} <span className="text-xs font-normal text-stone-500">so'm</span>
                  </div>
                </div>

                <button
                  disabled={totalStems === 0}
                  onClick={handleAddToCart}
                  className={`px-5 py-3 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
                    totalStems > 0
                      ? 'bg-rose-900 hover:bg-rose-950 text-white active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Savatga Qo'shish</span>
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT: Studio Customizer Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            
            {/* Step Tabs Navigation */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg mb-6 text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('flowers')}
                className={`flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'flowers' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1. Gullar ({totalStems})
              </button>
              <button
                onClick={() => setActiveTab('wrapping')}
                className={`flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'wrapping' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                2. O'ram & Lenta
              </button>
              <button
                onClick={() => setActiveTab('addons')}
                className={`flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'addons' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                3. Sovg'alar ({selectedAddOns.length})
              </button>
              <button
                onClick={() => setActiveTab('card')}
                className={`flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'card' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                4. Tabriknoma
              </button>
            </div>

            {/* TAB 1: Flowers Stem Selector */}
            {activeTab === 'flowers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs text-stone-500 font-medium">Gul navi va ma'nosi</span>
                  <span className="text-xs text-stone-500 font-medium">Bitta donasi / Soni</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {CUSTOM_FLOWER_STEMS.map((flower) => {
                    const qty = stems[flower.id] || 0;
                    return (
                      <div
                        key={flower.id}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          qty > 0 ? 'border-rose-300 bg-rose-50/30' : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Color Badge Indicator */}
                          <div
                            className="w-8 h-8 rounded-full border border-stone-200 shadow-xs flex items-center justify-center shrink-0"
                            style={{ backgroundColor: flower.colorHex }}
                          >
                            {qty > 0 && <span className="text-[10px] font-bold text-stone-800 drop-shadow-xs font-mono">{qty}</span>}
                          </div>

                          <div className="space-y-0.5">
                            <div className="text-xs sm:text-sm font-semibold text-stone-900">
                              {flower.uzName}
                            </div>
                            <div className="text-[11px] text-stone-500 line-clamp-1">
                              {flower.symbolism}
                            </div>
                            <div className="text-xs font-mono font-medium text-rose-900">
                              {flower.pricePerStem.toLocaleString('uz-UZ')} so'm
                            </div>
                          </div>
                        </div>

                        {/* Stepper (+ / -) */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 rounded-lg p-1">
                          <button
                            onClick={() => handleUpdateStem(flower.id, -1)}
                            disabled={qty === 0}
                            aria-label={`${flower.uzName} sonini kamaytirish`}
                            className={`w-6 h-6 rounded flex items-center justify-center transition-colors cursor-pointer ${
                              qty > 0 ? 'bg-white text-stone-800 hover:bg-stone-200' : 'text-stone-300 cursor-not-allowed'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="w-5 text-center text-xs font-bold font-mono tabular-nums">
                            {qty}
                          </span>

                          <button
                            onClick={() => handleUpdateStem(flower.id, 1)}
                            aria-label={`${flower.uzName} sonini oshirish`}
                            className="w-6 h-6 rounded bg-stone-900 hover:bg-rose-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Wrapper & Ribbon */}
            {activeTab === 'wrapping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-3">
                    Premium O'rash Qog'ozi Uslubi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WRAPPER_STYLES.map((wrap) => {
                      const isSelected = selectedWrapperId === wrap.id;
                      return (
                        <div
                          key={wrap.id}
                          onClick={() => setSelectedWrapperId(wrap.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                            isSelected ? 'border-rose-900 bg-rose-50/40 ring-1 ring-rose-900' : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-lg shrink-0 border border-stone-200"
                            style={{ backgroundColor: wrap.colorHex }}
                          />
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-stone-900 flex items-center justify-between">
                              <span>{wrap.name}</span>
                              <span className="font-mono text-stone-600">+{wrap.price.toLocaleString('uz-UZ')} so'm</span>
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">{wrap.texture}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-rose-900" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h3 className="text-sm font-semibold text-stone-900 mb-3">
                    Satin va Baxmal Lenta Tanlovi
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {RIBBON_STYLES.map((rib) => {
                      const isSelected = selectedRibbonId === rib.id;
                      return (
                        <div
                          key={rib.id}
                          onClick={() => setSelectedRibbonId(rib.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                            isSelected ? 'border-rose-900 bg-rose-50/40 ring-1 ring-rose-900' : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full mx-auto mb-1.5 border border-stone-200 shadow-xs"
                            style={{ backgroundColor: rib.colorHex }}
                          />
                          <div className="text-xs font-semibold text-stone-900">{rib.name}</div>
                          <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                            +{rib.price.toLocaleString('uz-UZ')} so'm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Gift Add-ons */}
            {activeTab === 'addons' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-500">
                  Guldastaga qo'shimcha sovg'a yoki yoqimli esdalik qo'shish orqali unutilmas syurpriz qiling:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GIFT_ADDONS.map((gift) => {
                    const isSelected = selectedAddOns.includes(gift.id);
                    return (
                      <div
                        key={gift.id}
                        onClick={() => toggleAddOn(gift.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected ? 'border-rose-900 bg-rose-50/40 ring-1 ring-rose-900' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 text-rose-800">
                          <Heart className="w-5 h-5 fill-rose-100" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
                            <span>{gift.name}</span>
                            <span className="font-mono text-rose-900">+{gift.price.toLocaleString('uz-UZ')} so'm</span>
                          </div>
                          <div className="text-[11px] text-stone-500 mt-1 leading-snug">
                            {gift.description}
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-rose-900 shrink-0 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: Greeting Postcard */}
            {activeTab === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Qabul qiluvchining ismi (Ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Madinaxon, Oyijon, Aziz do'stim..."
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-stone-700">
                      Tabriknoma matni (Biz guldasta ichiga xattotlik bilan yozib qo'yamiz)
                    </label>
                    <span className="text-[11px] text-stone-400 font-mono">{cardMessage.length}/200</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Yurak so'zlaringizni shu yerga yozing..."
                    className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800 resize-none font-serif-brand text-stone-800"
                  />
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-medium block mb-2">
                    Tayyor chiroyli tabrik shablonlari:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GREETING_CARD_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCardMessage(preset.text)}
                        className="p-2.5 text-left text-xs bg-stone-50 hover:bg-rose-50 hover:border-rose-200 border border-stone-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="font-semibold text-stone-800 mb-0.5">{preset.title}</div>
                        <div className="text-stone-500 line-clamp-2 text-[11px]">"{preset.text}"</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Next / Prev Guidance */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Har bir guldasta professional xavfsiz o'ramda yetkaziladi</span>
              {activeTab !== 'card' ? (
                <button
                  onClick={() => {
                    if (activeTab === 'flowers') setActiveTab('wrapping');
                    else if (activeTab === 'wrapping') setActiveTab('addons');
                    else if (activeTab === 'addons') setActiveTab('card');
                  }}
                  className="text-rose-900 font-semibold hover:underline cursor-pointer"
                >
                  Keyingi bosqich &rarr;
                </button>
              ) : null}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
