import React, { useState, useMemo } from 'react';
import { 
  X, Check, Lock, QrCode, Smartphone, CreditCard, ShieldCheck, 
  MapPin, Clock, ArrowRight, UserCheck, AlertCircle, Copy, Download 
} from 'lucide-react';
import { CartItem, DeliveryType, EWalletProvider, OrderDetails, FreeBonusOption } from '../types';
import { TASHKENT_DISTRICTS } from '../data/flowers';
import { sounds } from '../utils/audio';
import { FreeBonusSelector } from './FreeBonusSelector';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderCompleted: (order: OrderDetails) => void;
  selectedBonus: FreeBonusOption | null;
  onSelectBonus: (bonus: FreeBonusOption) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderCompleted,
  selectedBonus,
  onSelectBonus,
}) => {
  // Form fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('+998 ');
  const [isSurpriseGift, setIsSurpriseGift] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientPhone, setRecipientPhone] = useState<string>('+998 ');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('mirzo-ulugbek');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('express');
  
  // Payment step
  const [step, setStep] = useState<'info' | 'payment' | 'sms_verify' | 'receipt'>('info');
  const [paymentMethod, setPaymentMethod] = useState<EWalletProvider>('payme');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [smsCode, setSmsCode] = useState<string>('');
  const [smsError, setSmsError] = useState<string>('');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedTx, setCopiedTx] = useState<boolean>(false);

  // District & delivery fee
  const district = useMemo(() => {
    return TASHKENT_DISTRICTS.find((d) => d.id === selectedDistrictId) || TASHKENT_DISTRICTS[0];
  }, [selectedDistrictId]);

  const deliveryFee = useMemo(() => {
    let fee = district.deliveryFee;
    if (deliveryType === 'express') fee += 35000;
    else if (deliveryType === 'scheduled') fee += 10000;
    if (subtotal >= 500000 && deliveryType !== 'express') fee = 0;
    return fee;
  }, [district, deliveryType, subtotal]);

  const totalAmount = Math.max(0, subtotal - discount + deliveryFee);

  if (!isOpen) return null;

  // Validation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerPhone.length < 9 || !deliveryAddress.trim()) {
      alert('Iltimos, ismingiz, telefon raqamingiz va aniq manzilni to\'ldiring!');
      return;
    }
    setStep('payment');
  };

  // Payment triggers
  const handleStartPayment = () => {
    if (paymentMethod === 'cash') {
      finalizeOrder('cash');
      return;
    }

    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        alert('Karta raqamini to\'liq kiriting (16 ta raqam)');
        return;
      }
    }

    // Go to SMS verification simulator
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('sms_verify');
    }, 600);
  };

  // SMS Confirmation Simulator
  const handleVerifySms = () => {
    if (smsCode !== '1234' && smsCode.length < 4) {
      setSmsError('Xavfsizlik kodi xato. Sinov uchun "1234" kodini kiriting.');
      return;
    }

    setIsProcessing(true);
    setSmsError('');

    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder(paymentMethod);
    }, 1000);
  };

  // Finalize order
  const finalizeOrder = (method: EWalletProvider) => {
    sounds.playSuccess();
    const orderId = `GF-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = `TX-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const now = new Date();
    const arrivalTime = new Date(now.getTime() + (deliveryType === 'express' ? 35 : 60) * 60 * 1000);

    const newOrder: OrderDetails = {
      orderId,
      createdAt: now.toLocaleString('uz-UZ'),
      items,
      customerName,
      customerPhone,
      recipientName: isSurpriseGift ? recipientName : customerName,
      recipientPhone: isSurpriseGift ? recipientPhone : customerPhone,
      isAnonymousGift: isSurpriseGift,
      deliveryDistrict: district.name,
      deliveryAddress,
      deliveryNotes,
      deliveryType,
      deliveryFee,
      subtotal,
      discount,
      total: totalAmount,
      paymentMethod: method,
      paymentStatus: method === 'cash' ? 'pending' : 'paid',
      transactionId: txId,
      freeBonus: selectedBonus || undefined,
      estimatedArrivalTimestamp: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'accepted',
      courierName: 'Davron Rustamov (Skuter / Express)',
      courierPhone: '+998 97 712-34-56',
    };

    setCompletedOrder(newOrder);
    setStep('receipt');
    onOrderCompleted(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h3 className="font-serif-brand text-lg sm:text-xl font-bold text-stone-900">
              {step === 'info' && '1. Yetkazib Berish Ma\'lumotlari'}
              {step === 'payment' && '2. To\'lov Tizimini Tanlash'}
              {step === 'sms_verify' && '3. To\'lovni Tasdiqlash (SMS)'}
              {step === 'receipt' && 'Buyurtma Qabul Qilindi!'}
            </h3>
          </div>

          {step !== 'receipt' && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: DELIVERY INFO FORM */}
        {step === 'info' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Customer Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-rose-800" />
                <span>Buyurtmachi Ma'lumotlari:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Ism va familiyangiz *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Masalan: Sardor Aliyev"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Telefon raqamingiz *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Surprise Gift Toggle */}
            <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSurpriseGift}
                  onChange={(e) => setIsSurpriseGift(e.target.checked)}
                  className="accent-rose-800 w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-rose-950">
                  🎁 Bu boshqa insonga kutilmagan syurpriz sovg'a (Anonim yetkazish mumkin)
                </span>
              </label>

              {isSurpriseGift && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-rose-200/50">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Qabul qiluvchining ismi:
                    </label>
                    <input
                      type="text"
                      placeholder="Qabul qiluvchi ismi"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:outline-none focus:border-rose-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Qabul qiluvchining telefoni (Kuryer uchun):
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 9X XXX XX XX"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:outline-none focus:border-rose-800 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Address & District */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-800" />
                <span>Yetkazib Berish Manzili:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tuman / Hudud *
                  </label>
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                  >
                    {TASHKENT_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} {d.deliveryFee === 0 ? '(Bepul)' : `(+${d.deliveryFee.toLocaleString()} so'm)`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Yetkazish tezligi *
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                  >
                    <option value="express">Tezkor Express (30–45 daqiqa) +35 000 so'm</option>
                    <option value="standard">Standart (Bugun, 2 soat ichida)</option>
                    <option value="scheduled">Rejalashtirilgan aniq vaqtga</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Aniq ko'cha, uy, podyezd, qavat, xonadon raqami *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Masalan: Amir Temur ko'chasi 15-uy, 2-kirish, 4-qavat, 28-xonadon"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Kuryer uchun izoh (Mo'ljal yoki qo'ng'iroq yo'riqnomasi):
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Domofon kodi #124, eshik oldida qoldiring..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-rose-800"
                />
              </div>
            </div>

            {/* Total Footer */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-500">Jami to'lov:</div>
                <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                  {totalAmount.toLocaleString('uz-UZ')} so'm
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 hover:bg-rose-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>To'lov Usulini Tanlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: E-WALLETS & PAYMENT SELECTION */}
        {step === 'payment' && (
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <div className="text-xs text-stone-500">To'lov miqdori:</div>
                <div className="text-2xl font-bold font-mono text-rose-950 tabular-nums">
                  {totalAmount.toLocaleString('uz-UZ')} so'm
                </div>
              </div>
              <div className="text-right text-xs text-stone-500">
                <span>Manzil: {district.name}</span>
                <div className="text-emerald-700 font-medium">Tezkor yetkazish</div>
              </div>
            </div>

            {/* E-Wallets Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Elektron hamyon yoki to'lov turini tanlang:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Payme */}
                <div
                  onClick={() => setPaymentMethod('payme')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'payme'
                      ? 'border-[#00CCCC] bg-cyan-50/40 ring-2 ring-[#00CCCC]/40'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#00a8a8] font-mono tracking-tight">Payme</span>
                    {paymentMethod === 'payme' && <Check className="w-4 h-4 text-[#00a8a8]" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    Bir bosishda yoki QR orqali to'lov
                  </div>
                </div>

                {/* Click */}
                <div
                  onClick={() => setPaymentMethod('click')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'click'
                      ? 'border-[#0073FF] bg-blue-50/40 ring-2 ring-[#0073FF]/40'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#0073FF] tracking-tight">CLICK</span>
                    {paymentMethod === 'click' && <Check className="w-4 h-4 text-[#0073FF]" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    Click Up & QR kod orqali
                  </div>
                </div>

                {/* Uzum Pay */}
                <div
                  onClick={() => setPaymentMethod('uzumpay')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'uzumpay'
                      ? 'border-[#7000FF] bg-purple-50/40 ring-2 ring-[#7000FF]/40'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#7000FF] tracking-tight">Uzum Pay</span>
                    {paymentMethod === 'uzumpay' && <Check className="w-4 h-4 text-[#7000FF]" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    +1% Keshbek bilan to'lash
                  </div>
                </div>

                {/* Bank Kartasi */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-100 ring-2 ring-stone-900/30'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Uzcard / Humo</span>
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-stone-900" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    Visa / Mastercard
                  </div>
                </div>

                {/* Paynet */}
                <div
                  onClick={() => setPaymentMethod('paynet')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'paynet'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/40'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700">Paynet Hamyon</span>
                    {paymentMethod === 'paynet' && <Check className="w-4 h-4 text-emerald-700" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    Hamyon balansi orqali
                  </div>
                </div>

                {/* Cash on delivery */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'cash'
                      ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-600/40'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Yetkazilganda</span>
                    {paymentMethod === 'cash' && <Check className="w-4 h-4 text-amber-800" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2">
                    Kuryerga naqd yoki terminal
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Specific Interactive Simulation UI */}
            {(paymentMethod === 'payme' || paymentMethod === 'click' || paymentMethod === 'uzumpay') && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                {/* Simulated dynamic QR code */}
                <div className="w-28 h-28 bg-white p-2 rounded-lg border border-stone-300 shadow-xs flex flex-col items-center justify-center shrink-0">
                  <QrCode className="w-20 h-20 text-stone-800" />
                  <span className="text-[9px] font-mono text-stone-400 mt-0.5">Skanerlang</span>
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="text-xs font-semibold text-stone-900">
                    {paymentMethod === 'payme' && 'Payme ilovasi orqali to\'lash'}
                    {paymentMethod === 'click' && 'CLICK Evolution orqali to\'lash'}
                    {paymentMethod === 'uzumpay' && 'Uzum Bank ilovasi orqali to\'lash'}
                  </div>
                  <p className="text-xs text-stone-500">
                    Telefoningiz kamerasini QR kodga qarating yoki quyidagi tugma orqali ilovada tezkor to'lovni tasdiqlang.
                  </p>
                  <div className="text-[11px] text-emerald-700 font-mono">
                    ✓ Shifrlangan xavfsiz to'lov shlyuzi
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Karta raqami (Uzcard / Humo / Visa)
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="8600 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Amal qilish muddati
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      CVV / Parol
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="***"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => setStep('info')}
                className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                &larr; Manzilni tahrirlash
              </button>

              <button
                disabled={isProcessing}
                onClick={handleStartPayment}
                className="px-6 py-3 bg-rose-900 hover:bg-rose-950 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-98 flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>To'lov tizimiga ulanmoqda...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>To'lovni Tasdiqlash — {totalAmount.toLocaleString('uz-UZ')} so'm</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: SMS VERIFICATION SIMULATOR */}
        {step === 'sms_verify' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <Smartphone className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                SMS Tasdiqlash Kodi
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                <span className="font-mono text-stone-800">{customerPhone}</span> raqamingizga 4 xonali bir martalik to'lov kodi yuborildi.
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-2">
              <input
                type="text"
                maxLength={4}
                autoFocus
                placeholder="1234"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                className="w-full py-3 text-center text-2xl font-mono tracking-widest bg-stone-50 border-2 border-stone-300 rounded-xl focus:outline-none focus:border-rose-900 text-stone-900"
              />
              <div className="text-[11px] text-stone-400">
                Sinov uchun kod: <span className="font-mono font-bold text-stone-700">1234</span>
              </div>
              {smsError && <div className="text-xs text-rose-700 font-medium">{smsError}</div>}
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setStep('payment')}
                className="px-4 py-2 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Orqaga qaytish
              </button>

              <button
                disabled={isProcessing}
                onClick={handleVerifySms}
                className="px-6 py-2.5 bg-rose-900 hover:bg-rose-950 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                {isProcessing ? 'Tekshirilmoqda...' : 'Tasdiqlash va To\'lash'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OFFICIAL DIGITAL RECEIPT & ORDER TRACKING TRIGGER */}
        {step === 'receipt' && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-2">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                Buyurtmangiz Muvaffaqiyatli Qabul Qilindi!
              </h3>
              <p className="text-xs text-stone-500">
                Floristimiz allaqachon eng yangi gullarni saralab buketni yig'ishga kirishdi.
              </p>
            </div>

            {/* Official Fiscal E-Receipt Paper */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3 font-mono">
              <div className="text-center pb-2 border-b border-dashed border-stone-300">
                <div className="font-bold text-stone-900 uppercase font-serif-brand text-sm tracking-wide">
                  UYCHI GULLARI BOUTIQUE
                </div>
                <div className="text-[10px] text-stone-500">
                  Elektron Fiskal Chek № {completedOrder.orderId}
                </div>
                <div className="text-[10px] text-stone-400">
                  {completedOrder.createdAt}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 py-1">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate max-w-[200px]">
                      {item.isCustom ? item.customBouquet?.title : item.bouquet?.name} x{item.quantity}
                    </span>
                    <span>{(item.unitPrice * item.quantity).toLocaleString()} so'm</span>
                  </div>
                ))}

                {/* Free bonus item on receipt */}
                {completedOrder.freeBonus && (
                  <div className="flex justify-between text-rose-900 font-bold bg-rose-50/80 p-1 rounded">
                    <span>🎁 Bepul Bonus ({completedOrder.freeBonus.name})</span>
                    <span className="text-emerald-700">0 so'm (SOVG'A)</span>
                  </div>
                )}
                
                {completedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Aksiya / Promokod chegirmasi</span>
                    <span>-{completedOrder.discount.toLocaleString()} so'm</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-500">
                  <span>Yetkazib berish ({completedOrder.deliveryDistrict})</span>
                  <span>{completedOrder.deliveryFee === 0 ? '0 so\'m (Bepul)' : `${completedOrder.deliveryFee.toLocaleString()} so'm`}</span>
                </div>
              </div>

              {/* Total & Tx */}
              <div className="pt-2 border-t border-dashed border-stone-300 space-y-1">
                <div className="flex justify-between text-sm font-bold text-stone-900">
                  <span>JAMI TO'LANDI:</span>
                  <span>{completedOrder.total.toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>To'lov usuli:</span>
                  <span className="uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>Tranzaksiya ID:</span>
                  <span className="font-mono">{completedOrder.transactionId}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-[10px] text-stone-400">
                Yetkazish manzili: {completedOrder.deliveryAddress}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Uychi Gullari Buyurtma: ${completedOrder.orderId}`);
                  setCopiedTx(true);
                  setTimeout(() => setCopiedTx(false), 2000);
                }}
                className="flex-1 py-2.5 px-4 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedTx ? 'Nusxa olindi!' : 'Chekni saqlash'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Xaridni Tugatish</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
