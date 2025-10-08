"use client";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import PopUpAlert from "./PopUpAlert";

export default function CartSideBar({
  setShowPopup,
}: {
  setShowPopup?: (val: boolean) => void;
}) {
  const { cart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => setIsOpen(!isOpen);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const storedOrder = JSON.parse(localStorage.getItem("localOrders") || "[]");
    storedOrder.push({
      id: crypto.randomUUID(),
      items: cart,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("localOrders", JSON.stringify(storedOrder));
    clearCart();
    toggleSideBar();
    setShowPopup?.(true);
  };

  return (
    <>
      <button
        onClick={toggleSideBar}
        className="relative bg-lime-100 dark:bg-gray-500 hover:bg-purple-700 hover:text-white px-2 rounded-full">
        <ShoppingCart />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center font-bold text-white bg-red-500 rounded-full">
            {totalItems}
          </span>
        )}
      </button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40  ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSideBar}></div>
      <div
        className={`fixed top-0 right-0 h-full w-[28rem] bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-200 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Votre Panier</h2>
          <button onClick={toggleSideBar}>
            <X />
          </button>
        </div>

        <div className="flex flex-col flex-1 justify-between">
          {cart.length === 0 ? (
            <p className="p-5 text-center font-semibold">
              Votre Panier est vide, n'hésitez pas à le remplir par vos produits
              préférés
            </p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 flex-1 overflow-y-auto max-h-[60vh] p-4">
                {cart.map((item) => (
                  <li
                    className="flex gap-3 items-center py-3"
                    key={item.productId}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity}*${item.price}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t p-4">
                <div className="flex justify-between font-semibold mb-2">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-400 mt-4 px-4">
                  Paiement
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
