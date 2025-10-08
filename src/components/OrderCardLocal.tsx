import { LocalOrder, LocalOrderItem } from "@/types";
import React from "react";
interface OrderCardLocalProps {
  cart: LocalOrder;
}
export default function OrderCardLocal({ cart }: OrderCardLocalProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-lg font-semibold">Commande locale : {cart.id}</h3>
      </div>
      <div className="grid grid-cols-1  gap-4">
        {cart.items.map((product: LocalOrderItem) => (
          <div
            key={product.productId}
            className="flex items-center gap-3 border rounded-lg p-3 bg-gray-50">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-sm text-black">{product.title}</p>
              <p className="text-gray-500 text-xs">
                Quantité: {product.quantity} * ${product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-black text-sm font-bold whitespace-nowrap">
              ${product.total?.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
