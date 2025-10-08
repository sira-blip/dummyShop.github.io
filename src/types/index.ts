export interface Product {
  id: string | number;
  name?: string;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  reviews?: number;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  total?: number;
  thumbnail: string;
}
export interface OrderProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
  discountPercentage?: number;
  discountedPrice?: number;
}
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface LocalOrderItem {
  productId: string | number;
  title: string;
  price: number;
  quantity: number;
  total?: number;
  thumbnail: string;
}

export interface LocalOrder {
  id: string | number;
  createdAt: string;
  items: LocalOrderItem[];
  userId?: string;
}
