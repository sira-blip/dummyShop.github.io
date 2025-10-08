import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import ProductsCard from "@/components/ProductsCard";
import { Product } from "@/types";

function CartDebug() {
  //CartDebug affiche le nombre des articles pour vérifier l'état
  const { cart } = useCart();
  return <div data-testid="cart-count">{cart.length}</div>;
}
const mockProduct: Product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
};
describe("Integration Test: ProductsCard + AddToCartButton + CartProvider", () => {
  it("ajoute un produit au panier et met à jour le compteur", () => {
    render(
      <CartProvider>
        <ProductsCard product={mockProduct} />
        <CartDebug />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-count").textContent).toBe("0");
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByTestId("cart-count").textContent).toBe("1");
    fireEvent.click(button);
    expect(screen.getByTestId("cart-count").textContent).toBe("1");
  });
});
