import { QueryClient } from '@tanstack/react-query';

/** QueryClient — configuration de base */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        retry: 1,
      }
    }
  });
}
