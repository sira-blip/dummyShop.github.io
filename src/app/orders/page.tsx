"use client";
/**
 * TODO:
 * - Lister les carts DummyJSON (GET /carts?limit=&skip=) comme "orders" readonly
 * - (Bonus) Ajouter une seconde section "Local Orders" (créées après un checkout simulé)
 * - Filtre temporel 7j / 30j / all (au moins sur les locales)
 */
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "@/lib/api";
import { useEffect, useState } from "react";
import { LocalOrder, OrderProduct } from "@/types";
import OrderCard from "../../components/OrderCard";
import OrderCardLocal from "../../components/OrderCardLocal";
import usePagination from "../../hooks/usePagination";
import useFilteredOrders from "../../hooks/useFilteredOrders";
import PopUpAlert from "@/components/PopUpAlert";

type Filter = "7j" | "30j" | "all";
type Tab = "dummy" | "local";

export default function Orders() {
  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);
  const [tab, setTab] = useState<Tab>("dummy");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const storedLocalOrders = localStorage.getItem("localOrders");
    if (storedLocalOrders) setLocalOrders(JSON.parse(storedLocalOrders));
  }, []);
  const limit = 5;
  const { page, setPage, totalPages, skip, setTotal } = usePagination(0, limit);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", limit, skip],
    queryFn: () => fetchCarts(limit, skip),
  });
  useEffect(() => {
    if (orders?.total) setTotal(orders.total);
  }, [orders?.total, setTotal]);
  const filteredLocalOrders = useFilteredOrders({
    orders: localOrders,
    filter,
  });
  const NoDataOfDummyOrders =
    !isLoading && !isError && orders?.carts.length === 0;
  const NoDataOfLocalOrders = filteredLocalOrders.length === 0;
  return (
    <div className="card">
      {isError && (
        <PopUpAlert
          color="red"
          message="Une erreur est survenue. Veuillez réessayer."
        />
      )}
      <h2 className="text-xl font-semibold mb-3">Orders</h2>
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setTab("dummy")}
          className={`px-4 py-2 shadow-sm hover:shadow-lg  ${
            tab === "dummy" ? "border-b border-purple-900" : "text-gray-500"
          }`}>
          commandes (dummy)
        </button>
        <button
          onClick={() => setTab("local")}
          className={`px-4 py-2 shadow-sm hover:shadow-lg  ${
            tab === "local" ? "border-b border-purple-900" : "text-gray-500"
          }`}>
          commandes locales
        </button>
      </div>
      {isLoading && <div className="skeleton h-20 w-full" />}
      {tab === "dummy" && (
        <div>
          {NoDataOfDummyOrders && (
            <p className="text-gray-500 text-center py-6">
              {" "}
              Aucune commande trouvée sur DummyJSON
            </p>
          )}
          {orders?.carts.map((cart) => (
            <div key={cart.id} className="border rounded-2xl p-4 my-4">
              <OrderCard cart={cart} />
            </div>
          ))}
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
              disabled={page >= totalPages}
              className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50">
              Suivant
            </button>
          </div>
        </div>
      )}
      {tab === "local" && (
        <div>
          {" "}
          <label className="mr-2">filter par :</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            className="border py-2 px-4 rounded">
            <option value="7j"> 7 jours </option>
            <option value="30j"> 30 jours </option>
            <option value="all"> Toutes </option>
          </select>
          {NoDataOfLocalOrders ? (
            <p className="text-gray-500 text-center py-6">
              {" "}
              Aucune commande local trouvée
            </p>
          ) : (
            filteredLocalOrders.map((cart) => (
              <div key={cart.id} className="border rounded-2xl p-4 my-4">
                <OrderCardLocal cart={cart} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
