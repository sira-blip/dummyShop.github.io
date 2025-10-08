import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "@/components/QueryProvider";
import Guard from "@/components/Guard";
import { CartProvider } from "@/context/CartContext";
import CartSideBar from "@/components/CartSideBar";
import NavBar from "@/components/NavBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-slate-100 dark:bg-black">
        <QueryProvider>
          <CartProvider>
            <NavBar />
            <main className="container py-6">
              <Guard>{children}</Guard>
            </main>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
