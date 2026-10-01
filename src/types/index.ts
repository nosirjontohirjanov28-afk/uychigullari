export type FlowerCategory = 
  | 'all'
  | 'roses'
  | 'tulips'
  | 'peonies'
  | 'hydrangea'
  | 'mixed'
  | 'vip'
  | 'gifts';

export interface FreeBonusOption {
  id: string;
  name: string;
  description: string;
  category: 'chocolate' | 'drink' | 'sweet' | 'souvenir';
  icon: string;
  valueEstimateUz: number;
}

export interface BouquetItem {
  id: string;
  name: string;
  tagline: string;
  category: FlowerCategory;
  price: number; // in UZS
  originalPrice?: number; // original price before discount
  discountPercent?: number; // e.g. 15% discount
  rating: number;
  reviewCount: number;
  imageUrl: string;
  stemsCount: number;
  heightCm: number;
  diameterCm: number;
  composition: string[];
  description: string;
  deliveryTimeEstimateMin: number;
  isPopular?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  colors: string[];
  occasions: string[];
}

export interface CustomFlowerStem {
  id: string;
  name: string;
  uzName: string;
  variety: string;
  pricePerStem: number; // in UZS
  colorHex: string;
  colorName: string;
  fragranceLevel: 'Yengil' | 'O\'rtacha' | 'Xushbo\'y' | 'Nafis';
  symbolism: string;
  iconPath?: string;
}

export interface WrapperStyle {
  id: string;
  name: string;
  colorHex: string;
  previewBg: string;
  texture: string;
  price: number;
}

export interface RibbonStyle {
  id: string;
  name: string;
  colorHex: string;
  price: number;
}

export interface GiftAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  iconName: string;
}

export interface CustomBouquetConfig {
  id: string;
  title: string;
  stems: Record<string, number>; // flowerId -> quantity
  wrapperId: string;
  ribbonId: string;
  addOnIds: string[];
  cardMessage: string;
  recipientName: string;
  totalStems: number;
  preparationTimeMin: number;
  totalPrice: number;
}

export interface CartItem {
  cartItemId: string;
  isCustom: boolean;
  bouquet?: BouquetItem;
  customBouquet?: CustomBouquetConfig;
  quantity: number;
  selectedGreetingCard?: string;
  selectedRibbon?: string;
  customNote?: string;
  unitPrice: number;
}

export type DeliveryType = 'express' | 'standard' | 'scheduled';

export interface DistrictInfo {
  id: string;
  name: string;
  estimatedMinutes: number;
  deliveryFee: number;
}

export type EWalletProvider = 'payme' | 'click' | 'uzumpay' | 'paynet' | 'card' | 'cash';

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  isAnonymousGift: boolean;
  deliveryDistrict: string;
  deliveryAddress: string;
  deliveryNotes?: string;
  deliveryType: DeliveryType;
  scheduledTime?: string;
  deliveryFee: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: EWalletProvider;
  paymentStatus: 'pending' | 'paid' | 'delivered';
  transactionId: string;
  freeBonus?: FreeBonusOption;
  estimatedArrivalTimestamp: string;
  status: 'accepted' | 'preparing' | 'on_the_way' | 'delivered';
  courierName?: string;
  courierPhone?: string;
}
