"use client";
/**
 * TODO:
 * - KPI 1: Nombre d'utilisateurs (GET /users?limit=&skip=)
 * - KPI 2: Orders 7j (local)
 * - KPI 3: Revenue 7j (local)
 * - Mini chart (Recharts ou canvas) sur 7 jours
 */
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchCarts } from "@/lib/api";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LocalOrder } from "@/types";
import { useEffect, useState } from "react";

export default function Metrics() {
  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);
  useEffect(() => {
    const storedLocalOrders = localStorage.getItem("localOrders");
    if (storedLocalOrders) setLocalOrders(JSON.parse(storedLocalOrders));
  }, []);
  const filteredLocalOrders = localOrders.filter((localOrders) => {
    const orderDate = new Date(localOrders.createdAt);
    const now = new Date();
    const sevenDays = new Date();
    sevenDays.setDate(now.getDate() - 7);
    return orderDate >= sevenDays;
  });
  const revenueLast7Days = filteredLocalOrders.reduce((revenue, order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return revenue + orderTotal;
  }, 0);
  const limit = 10;
  const skip = 0;
  const { data: users } = useQuery({
    queryKey: ["users", limit, skip],
    queryFn: () => fetchUsers(limit, skip),
  });
  const chartData = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => {
      const day = new Date();
      day.setDate(new Date().getDate() - i);
      const dateToString = day.toISOString().slice(0, 10);
      const ordersForDay = filteredLocalOrders.filter(
        (order) => order.createdAt.slice(0, 10) === dateToString
      );
      const revenue = ordersForDay.reduce(
        (sum, order) =>
          sum +
          order.items.reduce((s, item) => s + item.price * item.quantity, 0),
        0
      );
      return { date: dateToString, revenue };
    })
    .reverse();
  const hasnoChartData = chartData.some((data) => data.revenue > 0);
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">
          Métriques des 7 derniers jours
        </h2>
        <div className="text-sm text-gray-600">Utilisateurs</div>
        <div className="text-2xl font-semibold">{users?.total}</div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-600">commandes 7j (local)</div>
        <div className="text-2xl font-semibold">
          {filteredLocalOrders?.length}
        </div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-600">Revenue 7j (local)</div>
        <div className="text-2xl font-semibold">
          ${revenueLast7Days.toFixed(2)}
        </div>
      </div>
      <div className="card md:col-span-3">
        {hasnoChartData ? (
          <div className="text-sm text-gray-600 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={600} height={300} data={chartData}>
                <CartesianGrid />
                <Line dataKey="revenue" />
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 skeleton mt-2 flex justify-center items-center text-gray-600 ">
            Aucune donnée trouvé
          </div>
        )}
      </div>
    </div>
  );
}
