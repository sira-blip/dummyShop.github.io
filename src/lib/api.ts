/**
 * API client (DummyJSON) — *AUCUNE logique implémentée*.
 * Implémentez les fonctions en suivant le contrat du README.
 */
const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";
export type ProductsResponse = { products: any[]; total: number; skip: number; limit: number };
export type CartsResponse = { carts: any[]; total: number; skip: number; limit: number };
export type UsersResponse = { users: any[]; total: number; skip: number; limit: number };

/** TODO: implémentez fetchProducts(limit, skip) */
export async function fetchProducts(limit=12, skip=0): Promise<ProductsResponse> {
  throw new Error("TODO: fetchProducts non implémenté");
}

/** TODO: implémentez searchProducts(query, limit, skip) */
export async function searchProducts(query:string, limit=12, skip=0): Promise<ProductsResponse> {
  throw new Error("TODO: searchProducts non implémenté");
}

/** TODO: implémentez fetchCategories() */
export async function fetchCategories(): Promise<string[]> {
  throw new Error("TODO: fetchCategories non implémenté");
}

/** TODO: implémentez fetchProductsByCategory(category, limit, skip) */
export async function fetchProductsByCategory(category:string, limit=12, skip=0): Promise<ProductsResponse> {
  throw new Error("TODO: fetchProductsByCategory non implémenté");
}

/** TODO: implémentez fetchCarts(limit, skip) */
export async function fetchCarts(limit=5, skip=0): Promise<CartsResponse> {
  throw new Error("TODO: fetchCarts non implémenté");
}

/** TODO: implémentez fetchUsers(limit, skip) */
export async function fetchUsers(limit=10, skip=0): Promise<UsersResponse> {
  throw new Error("TODO: fetchUsers non implémenté");
}
