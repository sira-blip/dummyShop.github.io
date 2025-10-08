"use client";
/**
 * Composant Guard — redirige vers /login si non connecté.
 * TODO: utilisez isAuthed() quand vous l'aurez implémenté.
 */
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthed } from "@/lib/auth";

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // TODO: activer la redirection réelle une fois l'auth façade prête
    if (!isAuthed() && pathname !== "/login") router.replace("/login");
  }, [router, pathname]);
  return <>{children}</>;
}
