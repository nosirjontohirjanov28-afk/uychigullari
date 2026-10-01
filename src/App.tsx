/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogSection } from './components/CatalogSection';
import { BouquetBuilder } from './components/BouquetBuilder';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DeliveryCalculatorModal } from './components/DeliveryCalculatorModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { FallingPetals } from './components/FallingPetals';

import { BouquetItem, CartItem, OrderDetails, DeliveryType, FreeBonusOption } from './types';
import { READY_BOUQUETS, FREE_BONUS_OPTIONS } from './data/flowers';
import { sounds } from './utils/audio';
import { CheckCircle2, Gift } from 'lucide-react';
import { FreeBonusSelector } from './components/FreeBonusSelector';

const INITIAL_DEMO_ORDER: OrderDetails = {
  orderId: 'UG-38291',
  createdAt: 'Bugun, 10:15',
  items: [
    {
      cartItemId: 'demo-1',
      isCustom: false,
      bouquet: READY_BOUQUETS[0],
      quantity: 1,
      selectedGreetingCard: 'Tug\'ilgan kuning muborak bo\'lsin, azizam!',
      unitPrice: READY_BOUQUETS[0].price,
    },
  ],
  customerName: 'Alisher Qodirov',
  customerPhone: '+998 90 123-45-67',
  recipientName: 'Zulayho Qodirova',
  recipientPhone: '+998 90 987-65-43',
  isAnonymousGift: true,
  deliveryDistrict: 'Uychi tumani markazi & mahallalari',
  deliveryAddress: 'Mustaqillik ko\'chasi 24-uy, 12-xonadon',
  deliveryNotes: 'Eshik oldida kutib oling',
  deliveryType: 'express',
  deliveryFee: 0,
  subtotal: READY_BOUQUETS[0].price,
  discount: 160000,
  total: READY_BOUQUETS[0].price,
  paymentMethod: 'payme',
  paymentStatus: 'paid',
  freeBonus: FREE_BONUS_OPTIONS[0],
  transactionId: 'TX-PAYME-84920419',
  estimatedArrivalTimestamp: '10:45',
  status: 'preparing',
  courierName: 'Davron Rustamov (Uychi Express)',
  courierPhone: '+998 97 712-34-56',
};

export default function App() {
  // Persistence states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gf_favs');
      return saved ? JSON.parse(saved) : ['bq-1', 'bq-3'];
    } catch {
      return ['bq-1', 'bq-3'];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('gf_orders');
      return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
    } catch {
      return [INITIAL_DEMO_ORDER];
    }
  });

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedBouquet, setSelectedBouquet] = useState<BouquetItem | null>(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  
  // Ambient Petals
  const [petalsEnabled, setPetalsEnabled] = useState<boolean>(true);

  // Selected Complimentary Free Bonus Gift (Chocolates, Drinks, etc.)
  const [selectedBonus, setSelectedBonus] = useState<FreeBonusOption | null>(() => FREE_BONUS_OPTIONS[0]);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('gf_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gf_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('gf_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add standard catalog bouquet to cart
  const handleAddToCart = (bouquet: BouquetItem, customGreetingCard?: string) => {
    sounds.playChime();
    setCart((prev) => {
      const existing = prev.find(
        (item) => !item.isCustom && item.bouquet?.id === bouquet.id && item.selectedGreetingCard === customGreetingCard
      );

      if (existing) {
        return prev.map((item) =>
          item.cartItemId === existing.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: CartItem = {
        cartItemId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        isCustom: false,
        bouquet,
        quantity: 1,
        selectedGreetingCard: customGreetingCard,
        unitPrice: bouquet.price,
      };

      return [...prev, newItem];
    });

    showToast(`"${bouquet.name}" savatchaga qo'shildi!`);
  };

  // Add custom bouquet from builder
  const handleAddCustomBouquetToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Shaxsiy guldastangiz savatchaga qo'shildi!`);
    setIsCartOpen(true);
  };

  // Cart actions
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Promo code validation
  const handleApplyPromoCode = (code: string): boolean => {
    if (code === 'UYCHI2026' || code === 'UYCHI') {
      setPromoCode(code);
      setDiscountPercent(20);
      sounds.playSuccess();
      return true;
    }
    if (code === 'BAHOR2025') {
      setPromoCode(code);
      setDiscountPercent(10);
      sounds.playSuccess();
      return true;
    }
    if (code === 'GUL2025') {
      setPromoCode(code);
      setDiscountPercent(15);
      sounds.playSuccess();
      return true;
    }
    return false;
  };

  // Favorites toggle
  const handleToggleFavorite = (bouquetId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(bouquetId);
      if (isFav) {
        return prev.filter((id) => id !== bouquetId);
      } else {
        sounds.playAddFlower();
        return [...prev, bouquetId];
      }
    });
  };

  // Order placement complete
  const handleOrderCompleted = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    showToast(`Buyurtma № ${newOrder.orderId} muvaffaqiyatli rasmiylashtirildi!`);
  };

  // Smooth scroll helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuilder = () => {
    const el = document.getElementById('bouquet-builder-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const focusSearchInput = () => {
    scrollToCatalog();
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 400);
  };

  // Totals for checkout
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
      
      {/* Falling petals romantic animation */}
      <FallingPetals enabled={petalsEnabled} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-bounce border border-stone-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        favoritesCount={favorites.length}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenDeliveryCalc={() => setIsDeliveryModalOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onNavigateToCatalog={scrollToCatalog}
        onNavigateToBuilder={scrollToBuilder}
        onFocusSearch={focusSearchInput}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          onExploreCatalog={scrollToCatalog}
          onOpenBuilder={scrollToBuilder}
          onCheckDelivery={() => setIsDeliveryModalOpen(true)}
        />

        {/* Ready Bouquets Catalog */}
        <CatalogSection
          onSelectBouquet={(b) => setSelectedBouquet(b)}
          onAddToCart={(b) => handleAddToCart(b)}
          onToggleFavorite={handleToggleFavorite}
          favoriteIds={favorites}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchRef={searchInputRef}
        />

        {/* Free Bonus Showcase Section */}
        <section className="py-6 bg-gradient-to-b from-[#FAF9F5] via-rose-50/40 to-[#FAF9F5] border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FreeBonusSelector
              selectedBonusId={selectedBonus?.id || null}
              onSelectBonus={(bonus) => {
                setSelectedBonus(bonus);
                sounds.playSuccess();
                showToast(`"${bonus.name}" bepul bonus sifatida tanlandi!`);
              }}
            />
          </div>
        </section>

        {/* Interactive Custom Bouquet Builder Studio */}
        <BouquetBuilder
          onAddCustomBouquetToCart={handleAddCustomBouquetToCart}
          onOpenDeliveryInfo={() => setIsDeliveryModalOpen(true)}
        />

        {/* Reviews and Craftsmanship Story */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToCatalog={scrollToCatalog}
        onNavigateToBuilder={scrollToBuilder}
        onOpenDeliveryCalc={() => setIsDeliveryModalOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        bouquet={selectedBouquet}
        isOpen={!!selectedBouquet}
        onClose={() => setSelectedBouquet(null)}
        onAddToCart={(b, card) => handleAddToCart(b, card)}
        isFavorite={selectedBouquet ? favorites.includes(selectedBouquet.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutModalOpen(true);
        }}
        promoCode={promoCode}
        onApplyPromoCode={handleApplyPromoCode}
        appliedDiscountPercent={discountPercent}
        selectedBonus={selectedBonus}
        onSelectBonus={(bonus) => {
          setSelectedBonus(bonus);
          sounds.playSuccess();
          showToast(`"${bonus.name}" bepul bonus sifatida tanlandi!`);
        }}
      />

      {/* 3. Checkout & Payment Modal (with E-Wallets) */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={discountAmount}
        onOrderCompleted={handleOrderCompleted}
        selectedBonus={selectedBonus}
        onSelectBonus={(bonus) => {
          setSelectedBonus(bonus);
          sounds.playSuccess();
          showToast(`"${bonus.name}" bepul bonus sifatida tanlandi!`);
        }}
      />

      {/* 4. Delivery Calculator Modal */}
      <DeliveryCalculatorModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />

      {/* 5. Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        activeOrders={orders}
      />

      {/* 6. Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favoriteIds={favorites}
        onSelectBouquet={(b) => setSelectedBouquet(b)}
        onAddToCart={(b) => handleAddToCart(b)}
        onRemoveFavorite={handleToggleFavorite}
      />

    </div>
  );
}
