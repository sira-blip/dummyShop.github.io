import React from "react";
import useProducts from "./useProducts";
import useProductSearch from "./useProductSearch";
interface ProductWithSearch {
  searchQuery: string;
  category: string;
  limit: number;
  skip: number;
}
export default function useProductWithSearch({
  searchQuery,
  category,
  limit,
  skip,
}: ProductWithSearch) {
  const isSearching = searchQuery.length > 0;
  const productsQuery = useProducts({
    category,
    limit,
    skip,
    enabled: !isSearching,
  });

  const search = useProductSearch({ query: searchQuery, limit, skip });
  const data = isSearching ? search.data : productsQuery.data;
  const isLoading = isSearching ? search.isLoading : productsQuery.isLoading;
  const isError = isSearching ? search.error : productsQuery.error;

  return {
    products: data?.products,
    total: data?.total ?? 0,
    isLoading,
    isError,
    isSearching,
  };
}
