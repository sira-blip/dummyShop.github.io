import { fetchProducts, fetchProductsByCategory } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ProductsParams {
  category?: string;
  limit: number;
  skip: number;
  enabled: boolean;
}
export default function useProducts({
  category,
  limit,
  skip,
  enabled = true,
}: ProductsParams) {
  return useQuery({
    queryKey: ["products", category, limit, skip],
    queryFn: () => {
      return category
        ? fetchProductsByCategory(category, limit, skip)
        : fetchProducts(limit, skip);
    },
    enabled,
  });
}
