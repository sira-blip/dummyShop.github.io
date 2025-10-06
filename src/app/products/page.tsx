'use client';
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
export default function Products() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Produits</h2>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input className="input" placeholder="Recherche…" />
        <select className="input max-w-xs">
          <option>Toutes catégories</option>
        </select>
      </div>
      <div className="skeleton h-24 w-full mb-3" />
      <div className="grid md:grid-cols-3 gap-4">
        {/* TODO: map des produits */}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button className="btn">Préc.</button>
        <div className="text-sm">Page X / Y</div>
        <button className="btn">Suiv.</button>
      </div>
    </div>
  );
}
