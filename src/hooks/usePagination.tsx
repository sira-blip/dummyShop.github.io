import React, { useMemo, useState } from "react";

export default function usePagination(totalProduct: number, limit: number) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(totalProduct);
  const totalPages = useMemo(
    () => Math.ceil(total / limit) || 1,
    [total, limit]
  );

  const skip = useMemo(() => (page - 1) * limit, [page, limit]);
  return { page, setPage, totalPages, skip, setTotal };
}
