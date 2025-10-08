import { render, screen } from "@testing-library/react";
import OrderCardLocal from "@/components/OrderCardLocal";
import { LocalOrder, LocalOrderItem } from "@/types";

const mockCart: LocalOrder = {
  id: 123,
  createdAt: new Date().toISOString(),
  items: [
    {
      productId: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",

      quantity: 2,
      total: 19.98,
    },
    {
      productId: 2,
      title: "Eyeshadow Palette with Mirror",
      price: 19.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      quantity: 3,
      total: 59.97,
    },
  ],
};

describe("OrderCardLocal", () => {
  it("affiche correctement les informations du panier local", () => {
    render(<OrderCardLocal cart={mockCart} />);
    expect(screen.getByText(/Commande locale :\s*123/i)).toBeInTheDocument();
    expect(
      screen.getByText("Essence Mascara Lash Princess")
    ).toBeInTheDocument();
    expect(screen.getByText("Quantité: 2 * $9.99")).toBeInTheDocument();
    expect(screen.getByText("$19.98")).toBeInTheDocument();
    expect(
      screen.getByText("Eyeshadow Palette with Mirror")
    ).toBeInTheDocument();
    expect(screen.getByText("Quantité: 3 * $19.99")).toBeInTheDocument();
    expect(screen.getByText("$59.97")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute(
      "src",
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    );
    expect(images[1]).toHaveAttribute(
      "src",
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    );
  });
});
