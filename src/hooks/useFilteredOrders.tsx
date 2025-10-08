import { LocalOrder } from "@/types";
import React from "react";
type Filter = "7j" | "30j" | "all";
interface FilteredOrderPrpps {
  orders: LocalOrder[];
  filter: Filter;
}
export default function useFilteredOrders({
  orders,
  filter,
}: FilteredOrderPrpps) {
  const filteredLocalOrders = orders.filter((order) => {
    if (filter === "all") return true;
    const days = filter === "7j" ? 7 : 30;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - days);
    return new Date(order.createdAt) >= currentDate;
  });
  return filteredLocalOrders;
}
