"use client";
/**
 * TODO:
 * - Brancher React Query aux endpoints DummyJSON
 *   - /products?limit=&skip=
 *   - /products/search?q=&limit=&skip=
 *   - /products/categories
 *   - /products/category/{category}?limit=&skip=
 * - Recherche (avec debounce)
 * - Filtres catégories
 * - Pagination (pageCount calculé depuis total/limit)
 * - États UI: loading skeleton, erreur, empty
 * - (Bonus) bouton "Ajouter au panier" (state local de votre choix)
 */
import { useEffect, useState } from "react";
import { Product } from "@/types";
import useDebounce from "../../hooks/useDebounce";
import ProductsCard from "../../components/ProductsCard";
import useCategories from "../../hooks/useCategories";
import useProductWithSearch from "../../hooks/useProductWithSearch";
import usePagination from "../../hooks/usePagination";
import PopUpAlert from "@/components/PopUpAlert";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;
  const debouncedSearch = useDebounce(search.trim(), 500);

  const { data: categories } = useCategories();
  const { page, setPage, totalPages, skip, setTotal } = usePagination(0, limit);
  const { products, total, isLoading, isError } = useProductWithSearch({
    searchQuery: debouncedSearch,
    category,
    limit,
    skip,
  });
  useEffect(() => {
    if (total) setTotal(total);
  }, [total, setTotal]);
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Produits</h2>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          className="input"
          placeholder="Recherche…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          className="input max-w-xs"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSearch("");
            setPage(1);
          }}>
          <option value="">Toutes catégories</option>
          {categories?.map((category) => (
            <option key={category.name} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-40 w-full rounded-md" />
          ))}
        </div>
      ) : isError ? (
        <PopUpAlert
          color="red"
          message="Une erreur est survenue. Veuillez réessayer."
        />
      ) : !products?.length ? (
        <p className="text-gray-500 text-center py-6"> Aucun produit trouvé</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p: Product) => (
            <ProductsCard product={p} key={p.id} />
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50">
          Précédant
        </button>
        <span className="px-4 py-2 font-medium">
          Page {page} sur {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= (totalPages || 0)}
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50">
          Suivant
        </button>
      </div>
    </div>
  );
}
