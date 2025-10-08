import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
export default function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
}
