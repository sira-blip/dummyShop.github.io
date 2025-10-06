'use client';
/**
 * TODO:
 * - KPI 1: Nombre d'utilisateurs (GET /users?limit=&skip=)
 * - KPI 2: Orders 7j (local)
 * - KPI 3: Revenue 7j (local)
 * - Mini chart (Recharts ou canvas) sur 7 jours
 */
export default function Metrics() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><div className="text-sm text-gray-600">Utilisateurs</div><div className="text-2xl font-semibold">—</div></div>
      <div className="card"><div className="text-sm text-gray-600">Orders 7j (local)</div><div className="text-2xl font-semibold">—</div></div>
      <div className="card"><div className="text-sm text-gray-600">Revenu 7j (local)</div><div className="text-2xl font-semibold">—</div></div>
      <div className="card md:col-span-3">
        <div className="text-sm text-gray-600">Évolution 7 jours</div>
        <div className="h-24 skeleton mt-2" />
      </div>
    </div>
  );
}
