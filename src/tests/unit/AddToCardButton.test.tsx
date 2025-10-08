import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import AddToCardButton from "@/components/AddToCardButton";

const mockProduct = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
};

describe("AddToCardButton", () => {
  it("ajoute un produit au panier quand on clique", () => {
    render(
      <CartProvider>
        <AddToCardButton product={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button.textContent?.toLowerCase()).toMatch(/ajouter au panier/);
  });
});
