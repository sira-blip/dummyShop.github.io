'use client';
/**
 * TODO:
 * - Lister les carts DummyJSON (GET /carts?limit=&skip=) comme "orders" readonly
 * - (Bonus) Ajouter une seconde section "Local Orders" (créées après un checkout simulé)
 * - Filtre temporel 7j / 30j / all (au moins sur les locales)
 */
export default function Orders() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Orders</h2>
      <div className="skeleton h-20 w-full" />
      {/* TODO: table orders */}
    </div>
  );
}
