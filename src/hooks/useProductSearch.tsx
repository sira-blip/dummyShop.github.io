import { searchProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ProductsSearchParams {
  query: string;
  limit: number;
  skip: number;
}
export default function useProductSearch({
  query,
  limit,
  skip,
}: ProductsSearchParams) {
  const newQuery = query.trim();
  return useQuery({
    queryKey: ["searchedProducts", newQuery, limit, skip],
    queryFn: () => searchProducts(newQuery, limit, skip),
    enabled: newQuery.length > 0,
  });
}
