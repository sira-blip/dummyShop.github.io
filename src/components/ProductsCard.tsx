"use client";
import AddToCardButton from "@/components/AddToCardButton";
import { Product } from "@/types";
import React from "react";

type ProductsCardProps = {
  product: Product;
};
export default function ProductsCard({ product }: ProductsCardProps) {
  return (
    <div className="flex flex-col gap-2 border rounded-lg p-3 shadow-sm">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-60 object-contain mb-2 rounded"
      />
      <div className="font-semibold">{product.title}</div>
      <div className="text-md ">
        <p className="font-light line-clamp-2">{product.description}</p>
      </div>
      <div className="text-lg font-bold text-black dark:text-gray-400">
        {product.price} $
      </div>
      <AddToCardButton product={product} />
    </div>
  );
}
