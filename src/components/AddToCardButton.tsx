import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import PopUpAlert from "./PopUpAlert";

interface AddToCardButtonProps {
  product: Product;
}

const AddToCardButton = ({ product }: AddToCardButtonProps) => {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCard = () => {
    addToCart(product, 1);
    setShowAlert(false);
    setTimeout(() => {
      setShowAlert(true);
    });
  };
  return (
    <>
      <button
        onClick={handleAddToCard}
        className="flex gap-2 justify-center w-full bg-purple-800 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:bg-purple-600">
        <ShoppingCart />
        Ajouter au panier
      </button>
      {showAlert && (
        <PopUpAlert
          color="green"
          message="Le produit a été ajouté au panier "
          duration={500}
        />
      )}
    </>
  );
};

export default AddToCardButton;
