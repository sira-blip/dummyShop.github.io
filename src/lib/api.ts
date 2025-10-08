/**
 * API client (DummyJSON) — *AUCUNE logique implémentée*.
 * Implémentez les fonctions en suivant le contrat du README.
 */
import { Category, Product } from "@/types";
const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
export type CartsResponse = {
  carts: any[];
  total: number;
  skip: number;
  limit: number;
};
export type UsersResponse = {
  users: any[];
  total: number;
  skip: number;
  limit: number;
};

/** TODO: implémentez fetchProducts(limit, skip) */
export async function fetchProducts(
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  const response = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Erreur de récupération de produits");
  return response.json();
}

/** TODO: implémentez searchProducts(query, limit, skip) */
export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE}/products/search?q=${query}&limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error("Erreur hors de la recherche des produits");
  return response.json();
}

/** TODO: implémentez fetchCategories() */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE}/products/categories`);
  if (!response.ok) throw new Error("Erreur de récupération des categories");
  return response.json();
}

/** TODO: implémentez fetchProductsByCategory(category, limit, skip) */
export async function fetchProductsByCategory(
  category: string,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE}/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok)
    throw new Error(
      "Erreur hors de la récupération des produits par catégorie"
    );
  return response.json();
}

/** TODO: implémentez fetchCarts(limit, skip) */
export async function fetchCarts(limit = 5, skip = 0): Promise<CartsResponse> {
  const response = await fetch(`${BASE}/carts?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Erreur de récupération des cartes");
  return response.json();
}

/** TODO: implémentez fetchUsers(limit, skip) */
export async function fetchUsers(limit = 10, skip = 0): Promise<UsersResponse> {
  const response = await fetch(`${BASE}/users?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Erreur de récupération des utilisateurs");
  return response.json();
}
export async function fetchAllUsers(): Promise<UsersResponse> {
  const response = await fetch(`${BASE}/users`);
  if (!response.ok) throw new Error("Erreur de récupération des utilisateurs");
  return response.json();
}
