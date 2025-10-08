"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocalOrderItem, Product } from "@/types";

export interface CartContextType {
  cart: LocalOrderItem[];
  addToCart: (product: Product, quantity?: number) => void;
  clearCart: () => void;
}
const CART_KEY = "cart";
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<LocalOrderItem[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const cartStored = localStorage.getItem(CART_KEY);
      setCart(cartStored ? JSON.parse(cartStored) : []);
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      } catch (err) {
        console.log("error saving cart", err);
      }
    }
  }, [cart, mounted]);
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existItem = prev.find((item) => item.productId === product.id);
      if (existItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: item.price * (item.quantity + quantity),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity,
          total: product.price * quantity,
        },
      ];
    });
  };

  const clearCart = () => setCart([]);
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart doit être utilisé au milieu de CartProvider");
  return context;
};
